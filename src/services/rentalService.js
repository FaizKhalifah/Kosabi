import mongoose from "mongoose";

import RentalRepository from "../repositories/rentalRepository.js";
import RoomRepository from "../repositories/roomRepository.js";
import UserRepository from "../repositories/UserRepository.js";

import { ResponseError } from "../utils/errorsUtils.js";

class RentalService {
  constructor() {
    this.rentalRepository = new RentalRepository();
    this.roomRepository = new RoomRepository();
    this.userRepository = new UserRepository();
  }

  // ==========================================
  // PRIVATE HELPERS
  // ==========================================

  _validateId(id, message = "Invalid ID") {
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      throw new ResponseError(400, message);
    }
  }

  _validateDates(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      throw new ResponseError(400, "Invalid rental date");
    }

    if (end <= start) {
      throw new ResponseError(400, "End date must be after start date");
    }

    return {
      startDate: start,
      endDate: end,
    };
  }

  _validateBillingDay(billingDay) {
    if (!Number.isInteger(billingDay) || billingDay < 1 || billingDay > 31) {
      throw new ResponseError(400, "Billing day must be between 1 and 31");
    }
  }

  async _validateTenant(tenantId, session) {
    this._validateId(tenantId, "Invalid tenant ID");

    const tenant = await this.userRepository.findById(tenantId, { session });

    if (!tenant) {
      throw new ResponseError(404, "Tenant not found");
    }

    if (tenant.role !== "TENANT") {
      throw new ResponseError(400, "User is not a tenant");
    }

    if (!tenant.isActive) {
      throw new ResponseError(400, "Tenant account is inactive");
    }

    return tenant;
  }

  async _validateRoom(roomId, session) {
    this._validateId(roomId, "Invalid room ID");

    const room = await this.roomRepository.findByIdForRental(roomId, session);

    if (!room) {
      throw new ResponseError(404, "Room not found");
    }

    if (!room.boardingHouse) {
      throw new ResponseError(400, "Room has no valid boarding house");
    }

    if (room.boardingHouse.status !== "ACTIVE") {
      throw new ResponseError(400, "Boarding house is inactive");
    }

    return room;
  }

  async _runTransaction(callback) {
    const session = await mongoose.startSession();

    try {
      return await session.withTransaction(async () => callback(session));
    } finally {
      await session.endSession();
    }
  }

  // ==========================================
  // GET ALL RENTALS
  // ==========================================

  async getAllRentals(query = {}) {
    const { search = "", sortBy = "createdAt", sortOrder = "desc" } = query;

    const allowedSortFields = [
      "startDate",
      "endDate",
      "billingDay",
      "status",
      "createdAt",
      "updatedAt",
    ];

    if (!allowedSortFields.includes(sortBy)) {
      throw new ResponseError(400, "Invalid sorting field");
    }

    if (!["asc", "desc"].includes(sortOrder)) {
      throw new ResponseError(400, "Invalid sorting order");
    }

    if (typeof search !== "string") {
      throw new ResponseError(400, "Search must be a string");
    }

    const page = Number(query.page ?? 1);
    const limit = Number(query.limit ?? 10);

    if (
      !Number.isInteger(page) ||
      page < 1 ||
      !Number.isInteger(limit) ||
      limit < 1 ||
      limit > 100
    ) {
      throw new ResponseError(400, "Invalid pagination parameters");
    }

    const safeSearch = search.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const result = await this.rentalRepository.findAll({
      search: safeSearch,
      sortBy,
      sortOrder,
      page,
      limit,
    });

    return {
      rentals: result.rentals,
      pagination: {
        total: result.total,
        page,
        limit,
        totalPages: Math.ceil(result.total / limit),
      },
    };
  }

  // ==========================================
  // GET RENTAL BY ID
  // ==========================================

  async getRentalById(id) {
    this._validateId(id, "Invalid rental ID");

    const rental = await this.rentalRepository.findById(id);

    if (!rental) {
      throw new ResponseError(404, "Rental not found");
    }

    return {
      rental,
    };
  }

  // ==========================================
  // CREATE RENTAL
  // ==========================================

  async createRental(data, currentUserId = null) {
    if (!data || typeof data !== "object") {
      throw new ResponseError(400, "Rental data is required");
    }

    const { tenantId, roomId, startDate, endDate, billingDay, notes } = data;

    this._validateBillingDay(billingDay);

    const dates = this._validateDates(startDate, endDate);

    return this._runTransaction(async (session) => {
      const tenant = await this.userRepository.findByIdForRental(
        tenantId,
        session,
      );

      const room = await this._validateRoom(roomId, session);

      // Claim kamar secara atomic
      const claimedRoom = await this.roomRepository.claimRoom(
        room._id,
        tenant._id,
        { session },
      );

      if (!claimedRoom) {
        throw new ResponseError(409, "Room is no longer available");
      }

      // Buat rental
      const rental = await this.rentalRepository.create(
        {
          tenant: tenant._id,
          room: room._id,

          startDate: dates.startDate,
          endDate: dates.endDate,

          // Snapshot harga kamar
          monthlyPrice: room.price,
          deposit: room.deposit,

          billingDay,

          // Rental baru selalu ACTIVE
          status: "ACTIVE",

          notes,

          createdBy: currentUserId || null,
        },
        { session },
      );

      return rental;
    });
  }

  // ==========================================
  // UPDATE RENTAL
  // ==========================================

  async updateRental(id, data) {
    this._validateId(id, "Invalid rental ID");

    if (!data || typeof data !== "object") {
      throw new ResponseError(400, "Update data is required");
    }

    const allowedFields = [
      "tenantId",
      "roomId",
      "startDate",
      "endDate",
      "billingDay",
      "notes",
      "status",
    ];

    for (const field of Object.keys(data)) {
      if (!allowedFields.includes(field)) {
        throw new ResponseError(400, `Field ${field} cannot be updated`);
      }
    }

    return this._runTransaction(async (session) => {
      const rental = await this.rentalRepository.findById(id, { session });

      if (!rental) {
        throw new ResponseError(404, "Rental not found");
      }

      if (rental.status !== "ACTIVE") {
        throw new ResponseError(409, "Only active rentals can be updated");
      }

      const newStatus = data.status ?? rental.status;

      if (!["ACTIVE", "FINISHED", "CANCELLED"].includes(newStatus)) {
        throw new ResponseError(400, "Invalid rental status");
      }

      const changingTenant =
        data.tenantId !== undefined &&
        String(data.tenantId) !== String(rental.tenant);

      const changingRoom =
        data.roomId !== undefined &&
        String(data.roomId) !== String(rental.room);

      const endingRental = newStatus !== "ACTIVE";

      // Tidak boleh mengganti tenant/kamar
      // sekaligus mengakhiri rental.
      if (endingRental && (changingTenant || changingRoom)) {
        throw new ResponseError(
          400,
          "Cannot change tenant or room while ending rental",
        );
      }

      const updateData = {};

      // Validasi tenant baru
      let newTenant = null;

      if (changingTenant) {
        newTenant = await this._validateTenant(data.tenantId, session);

        updateData.tenant = newTenant._id;
      }

      // Validasi kamar baru
      let newRoom = null;

      if (changingRoom) {
        newRoom = await this._validateRoom(data.roomId, session);

        updateData.room = newRoom._id;
        updateData.monthlyPrice = newRoom.price;
        updateData.deposit = newRoom.deposit;
      }

      // Validasi tanggal
      const nextStartDate = data.startDate ?? rental.startDate;

      const nextEndDate = data.endDate ?? rental.endDate;

      if (data.startDate !== undefined || data.endDate !== undefined) {
        const dates = this._validateDates(nextStartDate, nextEndDate);

        updateData.startDate = dates.startDate;
        updateData.endDate = dates.endDate;
      }

      // Validasi billing day
      if (data.billingDay !== undefined) {
        this._validateBillingDay(data.billingDay);
        updateData.billingDay = data.billingDay;
      }

      if (data.notes !== undefined) {
        if (typeof data.notes !== "string" || data.notes.length > 1000) {
          throw new ResponseError(400, "Invalid rental notes");
        }

        updateData.notes = data.notes;
      }

      updateData.status = newStatus;

      // ======================================
      // SINKRONISASI ROOM
      // ======================================

      if (endingRental) {
        // Rental selesai atau dibatalkan
        const released = await this.roomRepository.releaseRoom(
          rental.room,
          rental.tenant,
          { session },
        );

        if (!released) {
          throw new ResponseError(409, "Room occupancy data is inconsistent");
        }
      } else if (changingRoom) {
        // Claim kamar baru
        const claimed = await this.roomRepository.claimRoom(
          newRoom._id,
          newTenant?._id ?? rental.tenant,
          { session },
        );

        if (!claimed) {
          throw new ResponseError(409, "New room is no longer available");
        }

        // Release kamar lama
        const released = await this.roomRepository.releaseRoom(
          rental.room,
          rental.tenant,
          { session },
        );

        if (!released) {
          throw new ResponseError(
            409,
            "Old room occupancy data is inconsistent",
          );
        }
      } else if (changingTenant) {
        // Kamar tetap, penghuni berubah
        const changed = await this.roomRepository.changeOccupant(
          rental.room,
          rental.tenant,
          newTenant._id,
          { session },
        );

        if (!changed) {
          throw new ResponseError(409, "Room occupancy data is inconsistent");
        }
      }

      return this.rentalRepository.update(id, updateData, { session });
    });
  }

  // ==========================================
  // FINISH RENTAL
  // ==========================================

  async finishRental(id) {
    return this.updateRental(id, {
      status: "FINISHED",
    });
  }

  // ==========================================
  // CANCEL RENTAL
  // ==========================================

  async cancelRental(id) {
    return this.updateRental(id, {
      status: "CANCELLED",
    });
  }

  // ==========================================
  // DELETE RENTAL
  // ==========================================

  async deleteRental(id) {
    // Soft delete: rental tetap tersimpan
    // sebagai histori dengan status CANCELLED.
    return this.cancelRental(id);
  }

  // ==========================================
  // GET BY STATUS
  // ==========================================

  async getActiveRentals() {
    const rentals = await this.rentalRepository.getActiveRentals();

    return {
      rentals,
      total: rentals.length,
    };
  }

  async getFinishedRentals() {
    const rentals = await this.rentalRepository.getFinishedRentals();

    return {
      rentals,
      total: rentals.length,
    };
  }

  async getCanceledRentals() {
    const rentals = await this.rentalRepository.getCanceledRentals();

    return {
      rentals,
      total: rentals.length,
    };
  }
}

export default new RentalService();
