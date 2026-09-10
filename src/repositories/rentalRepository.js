import Rental from "../models/Rental.js";
import BaseRepository from "./baseRepository.js";

export default class RentalRepository extends BaseRepository {
  constructor() {
    super(Rental);
  }

  async findByTenant(id) {
    return Rental.findOne({ tenant: id });
  }
}
