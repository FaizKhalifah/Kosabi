import Room from "../models/Room.js";
import BaseRepository from "./baseRepository.js";

export default class RoomRepository extends BaseRepository {
  constructor() {
    super(Room);
  }

  async findByOccupantId(id) {
    return Room.findOne({ occupant: id });
  }

  async findAvailable() {
    return Room.findOne({ status: "AVAILABLE" });
  }

  async findOccupied() {
    return Room.findOne({ status: "OCCUPIED" });
  }

  async findUnderMaintenance() {
    return Room.findOne({ status: "MAINTENANCE" });
  }

  async findReserved() {
    return Room.findOne({ status: "RESERVED" });
  }
}
