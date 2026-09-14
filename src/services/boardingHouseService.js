import BoardingHouseRepository from "../repositories/boardingHouseRepository.js";

export default class BoardingHouseService {
  constructor() {
    this.repository = new BoardingHouseRepository();
  }

  async getAllBoardingHouse() {
    const boardingHouses = await this.repository.findAll();
    if (!boardingHouses || boardingHouses.length == 0) {
      return {
        message: "belum ada data boarding house",
      };
    }
    return {
      boardingHouses: boardingHouses,
    };
  }

  async getBoardingHouseById(id) {
    const boardingHouse = await this.repository.findById(id);
    if (!boardingHouse) {
      throw new Error("Boarding house not found");
    }
    return {
      boardingHouse: boardingHouse,
    };
  }

  async createBoardingHouse(data, photopath) {
    if (!data) {
      throw new Error("Data diperlukan untuk membuat boarding house baru");
    }
    const {
      name,
      description,
      address,
      city,
      province,
      postalCode,
      email,
      phone,
      rules,
      facilities,
      location,
      checkInTime,
      checkOutTime,
      status,
    } = data;

    return await this.repository.create({
      name,
      description,
      address,
      city,
      province,
      postalCode,
      email,
      phone,
      rules,
      facilities,
      location,
      checkInTime,
      checkOutTime,
      status,
      photo: photopath,
    });
  }

  async updateBoardingHouse(id, data, photopath) {
    if (!id) {
      throw new Error("Id is required to update boarding house");
    }

    const boardingHouse = await this.repository.findById(id);
    if (!boardingHouse) {
      throw new Error("Boarding house not found");
    }

    if (photopath && boardingHouse.photo) {
      const oldPath = path.join("public", boardingHouse.photo);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    const {
      name,
      description,
      address,
      city,
      province,
      postalCode,
      email,
      phone,
      rules,
      facilities,
      location,
      checkInTime,
      checkOutTime,
      status,
    } = data;

    return await this.repository.update({
      name,
      description,
      address,
      city,
      province,
      postalCode,
      email,
      phone,
      rules,
      facilities,
      location,
      checkInTime,
      checkOutTime,
      status,
      photo: photopath,
    });
  }

  async deleteBoardingHouse(id) {
    if (!id) {
      throw new Error("Id is required to delete boarding house");
    }

    const boardingHouse = await this.repository.findById(id);
    if (!boardingHouse) {
      throw new Error("Boarding house not found");
    }
    await this.repository.delete(id);
    return {
      message: "BoardingHouse has been deleted",
    };
  }
}
