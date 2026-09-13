import BoardingHouseRepository from "../repositories/boardingHouseRepository.js";

export default class BoardingHouseService {
  constructor() {
    this.repository = new BoardingHouseRepository();
  }

  async getAllBoardingHouse() {
    try {
      const boardingHouses = await this.repository.findAll();
      if (!boardingHouses || boardingHouses.length == 0) {
        return {
          message: "belum ada data boarding house",
        };
      }
      return {
        boardingHouses: boardingHouses,
      };
    } catch (err) {
      return err.message;
    }
  }

  async getBoardingHouseById(id) {
    try {
      const boardingHouse = await this.repository.findById(id);
      if (!boardingHouse) {
        throw new Error("Boarding house not found");
      }
      return {
        boardingHouse: boardingHouse,
      };
    } catch (err) {
      return err.message;
    }
  }

  async createBoardingHouse(data) {
    try {
    } catch (err) {
      return err.message;
    }
  }
}
