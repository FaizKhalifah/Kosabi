import Rental from "../models/Rental.js";
import BaseRepository from "./baseRepository.js";

export default class RentalRepository extends BaseRepository {
  constructor() {
    super(Rental);
  }

  async findByTenant(id) {
    return Rental.findOne({ tenant: id });
  }

  async getActiveRentals() {
    return Rental.find({ status: "ACTIVE" });
  }

  async getFinishedRentals() {
    return Rental.find({ status: "FINISHED" });
  }

  async getCanceledRentals() {
    return Rental.find({ status: "CANCELLED" });
  }
}
