import User from "../models/User.js";
import BaseRepository from "./baseRepository.js";

export default class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }

  async findAll({ search = "", sortBy = "createdAt", sortOrder = "desc" }) {
    const filter = {};
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
      ];
    }

    const sortOptions = {
      [sortBy]: sortOrder === "asc" ? 1 : -1,
    };

    return await this.model.find(filter).sort(sortOptions);
  }

  async findByName(name) {
    return User.findOne({ name });
  }

  async findByEmail(email) {
    return User.findOne({ email });
  }

  async findByPhone(phone) {
    return User.findOne({ phone });
  }

  async activate(id) {
    return User.updateOne({ _id: id }, { $set: { isActive: true } });
  }

  async deactivate(id) {
    return User.updateOne({ _id: id }, { $set: { isActive: false } });
  }

  async getAllTenants() {
    return User.find({ role: "TENANT" });
  }
}
