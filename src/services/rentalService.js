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

  async getAllRentals() {
    const rentals = await this.rentalRepository.findAll();
    if (!rentals || rentals.length == 0) {
      return {
        message: "belum ada data sewa",
      };
    }
    return {
      rentals: rentals,
    };
  }

  async getRentalById(id) {
    if (!id) {
      throw new ResponseError(401, "Id diperlukan untuk mencari data rental");
    }
    const rental = await this.rentalRepository.findById(id);
    if (!rental) {
      throw new ResponseError(401, "Data sewa tidak ditemukan");
    }
    return {
      rental: rental,
    };
  }

  async createRental(data) {
    if (!data) {
      throw new ResponseError(
        401,
        "Data diperlukan untuk membuat data sewa baru",
      );
    }

    const { tenantId, roomId, startDate, endDate, billingDay, status, notes } =
      data;
    const room = await this.roomRepository.findById(roomId);
    if (!room) {
      throw new ResponseError(401, "room not found");
    }
    const tenant = await this.userRepository.findById(tenantId);
    if (!tenant) {
      throw new ResponseError(401, "Tenant not found");
    }
    if (tenant.role !== "TENANT") {
      throw new ResponseError(401, "User is not a tenant");
    }
    const monthlyPrice = room.price;
    const deposit = room.deposit;
    const createResult = await this.rentalRepository.create({
      tenantId,
      roomId,
      startDate,
      endDate,
      monthlyPrice: monthlyPrice,
      deposit: deposit,
      billingDay,
      status,
      notes,
    });
    await this.roomRepository.update(room.id, { status: "OCCUPIED" });
    return createResult;
  }

  async updateRental(id, data) {
    if (!id) {
      throw new ResponseError(
        401,
        "Id diperlukan untuk mengupdate data rental",
      );
    }
    const rental = await this.rentalRepository.findById(id);
    if (!rental) {
      throw new ResponseError(401, "Rental tidak ditemukan");
    }

    const updateData = {};

    let tenant;
    if (data.tenantId) {
      tenant = await this.userRepository.findById(data.tenantId);
      if (!tenant) {
        throw new ResponseError(401, "Tenant not found");
      }
    }

    let room;
    if (data.roomId) {
      room = await this.roomRepository.findById(data.roomId);
      if (!room) {
        throw new ResponseError(401, "room not found");
      }
      updateData["monthlyPrice"] = room.price;
      updateData["deposit"] = room.deposit;
    }

    const allowedFields = [
      "tenantId",
      "roomId",
      "startDate",
      "endDate",
      "billingDay",
      "status",
      "notes",
    ];

    for (const field of allowedFields) {
      if (data[field] !== undefined) {
        updateData[field] = data[field];
      }
    }

    return await this.rentalRepository.update(id, updateData);
  }

  async deleteRental(id) {
    if (!id) {
      throw new ResponseError(401, "Id diperlukan untuk menghapus data rental");
    }
    const rental = await this.rentalRepository.findById(id);
    if (!rental) {
      throw new ResponseError(401, "Data rental tidak ditemukan");
    }
    return await this.rentalRepository.delete(id);
  }

  async getActiveRentals() {
    const rentals = await this.rentalRepository.getActiveRentals();
    if (!rentals || rentals.length == 0) {
      return {
        message: "Tidak ada rental yang aktif",
      };
    }
    return {
      rentals: rentals,
    };
  }

  async getFinishedRentals() {
    const rentals = await this.rentalRepository.getFinishedRentals();
    if (!rentals || rentals.length == 0) {
      return {
        message: "Tidak ada rental yang selesai",
      };
    }
    return {
      rentals: rentals,
    };
  }

  async getCanceledRentals() {
    const rentals = await this.rentalRepository.getCanceledRentals();
    if (!rentals || rentals.length == 0) {
      return {
        message: "Tidak ada rental yang dibatalkan",
      };
    }
    return {
      rentals: rentals,
    };
  }
}

export default new RentalService();
