import Room from "../models/Room.js";
import BaseRepository from "./baseRepository.js";

export default class RoomRepository extends BaseRepository {
  constructor() {
    super(Room);
  }

  async findAll({ sortBy = "createdAt", sortOrder = "desc" } = {}) {
    const sortOptions = {
      [sortBy]: sortOrder === "asc" ? 1 : -1,
    };

    return await this.model
      .find()
      .sort(sortOptions)
      .populate("boardingHouse", "name")
      .populate("occupant", "name");
  }

  async findById(id, options = {}) {
    let query = this.model.findById(id);

    query = query
      .populate("boardingHouse", "name status")
      .populate("occupant", "name");

    if (options.session) {
      query = query.session(options.session);
    }

    return await query;
  }

  async findByOccupantId(id) {
    return await this.model
      .findOne({ occupant: id })
      .populate("boardingHouse", "name")
      .populate("occupant", "name");
  }

  async findAvailable() {
    return await this.model
      .find({ status: "AVAILABLE" })
      .populate("boardingHouse", "name")
      .populate("occupant", "name");
  }

  async findOccupied() {
    return await this.model
      .find({ status: "OCCUPIED" })
      .populate("boardingHouse", "name")
      .populate("occupant", "name");
  }

  async findUnderMaintenance() {
    return await this.model
      .find({ status: "MAINTENANCE" })
      .populate("boardingHouse", "name")
      .populate("occupant", "name");
  }

  async findReserved() {
    return await this.model
      .find({ status: "RESERVED" })
      .populate("boardingHouse", "name")
      .populate("occupant", "name");
  }

  // ==========================================
  // NEW METHODS FOR RENTAL
  // ==========================================

  // Mengambil kamar beserta boarding house
  // dan mendukung MongoDB transaction.
  async findByIdForRental(id, session) {
    return await this.model
      .findById(id)
      .populate("boardingHouse", "name status")
      .session(session);
  }

  // Mengambil kamar hanya jika AVAILABLE.
  // Mencegah dua proses menyewa kamar yang sama.
  async claimRoom(roomId, tenantId, session) {
    return await this.model.findOneAndUpdate(
      {
        _id: roomId,
        status: "AVAILABLE",
        occupant: null,
      },
      {
        $set: {
          status: "OCCUPIED",
          occupant: tenantId,
        },
      },
      {
        new: true,
        runValidators: true,
        session,
      },
    );
  }

  // Mengembalikan kamar menjadi AVAILABLE.
  async releaseRoom(roomId, tenantId, session) {
    return await this.model.findOneAndUpdate(
      {
        _id: roomId,
        status: "OCCUPIED",
        occupant: tenantId,
      },
      {
        $set: {
          status: "AVAILABLE",
          occupant: null,
        },
      },
      {
        new: true,
        runValidators: true,
        session,
      },
    );
  }

  // Mengganti occupant ketika tenant berubah,
  // tetapi kamar yang digunakan tetap sama.
  async changeOccupant(roomId, oldTenantId, newTenantId, session) {
    return await this.model.findOneAndUpdate(
      {
        _id: roomId,
        status: "OCCUPIED",
        occupant: oldTenantId,
      },
      {
        $set: {
          occupant: newTenantId,
        },
      },
      {
        new: true,
        runValidators: true,
        session,
      },
    );
  }
}
