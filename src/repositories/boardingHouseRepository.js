import BoardingHouse from "../models/BoardingHouse.js";
import BaseRepository from "./baseRepository.js";

export default class BoardingHouseRepository extends BaseRepository {
  constructor() {
    super(BoardingHouse);
  }

  async findAll({ search = "", sortBy = "createdAt", sortOrder = "desc" }) {
    const filter = {};
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { address: { $regex: search, $options: "i" } },
        { city: { $regex: search, $options: "i" } },
        { province: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const sortOptions = {
      [sortBy]: sortOrder === "asc" ? 1 : -1,
    };

    return await this.model.find(filter).sort(sortOptions);
  }

  async findByEmail(email) {
    return BoardingHouse.findOne({ email });
  }

  async findByPhone(phone) {
    return BoardingHouse.findOne({ phone });
  }
}
