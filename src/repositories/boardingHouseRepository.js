import BoardingHouse from "../models/BoardingHouse.js";
import BaseRepository from "./baseRepository.js";

export default class BoardingHouseRepository extends BaseRepository {
  constructor() {
    super(BoardingHouse);
  }

  async findByEmail(email) {
    return BoardingHouse.findOne({ email });
  }

  async findByPhone(phone) {
    return BoardingHouse.findOne({ phone });
  }
}
