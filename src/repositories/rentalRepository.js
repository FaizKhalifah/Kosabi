import Rental from "../models/Rental.js";
import BaseRepository from "./baseRepository.js";

export default class RentalRepository extends BaseRepository {
  constructor() {
    super(Rental);
  }

  async findAll({ search = "", sortBy = "createdAt", sortOrder = "desc" }) {
    const filter = {};
    if (search) {
      filter.$or = [
        { tenant: { $regex: search, $options: "i" } },
        { monthlyPrice: { $regex: search, $options: "i" } },
        { deposit: { $regex: search, $options: "i" } },
        { billingDay: { $regex: search, $options: "i" } },
        { notes: { $regex: search, $options: "i" } },
      ];
    }

    const sortOptions = {
      [sortBy]: sortOrder === "asc" ? 1 : -1,
    };

    return await this.model
      .find(filter)
      .sort(sortOptions)
      .populate("tenant", "name")
      .populate("room", "roomNumber");
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
