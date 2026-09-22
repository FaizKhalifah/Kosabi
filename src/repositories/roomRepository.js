import Room from "../models/Room.js";
import BaseRepository from "./baseRepository.js";

export default class RoomRepository extends BaseRepository {
  constructor() {
    super(Room);
  }

  async findAll(filter = {}) {
    return await this.model
      .find(filter)
      .populate("boardingHouse", "name")
      .populate("occupant", "name");
  }

  async findById(id) {
    return await this.model
      .findById(id)
      .populate("boardingHouse", "name")
      .populate("occupant", "name");
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
}
