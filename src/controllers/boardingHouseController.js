import BoardingHouseService from "../services/boardingHouseService.js";

export default class ClassBoardingHouseController {
  async getAll(req, res) {
    try {
      const boardingHouses = await BoardingHouseService.getAllBoardingHouse();
      res.status(201).json(boardingHouses);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getById(req, res) {
    try {
      const boardingHouse = await BoardingHouseService.getBoardingHouseById(
        req.params.id,
      );
      res.status(201).json(boardingHouse);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async create(req, res) {
    try {
      const createResult = await BoardingHouseService.createBoardingHouse(
        req.body,
        req.files,
      );
      res.status(201).json({ success: true, data: createResult });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async update(req, res) {
    try {
      const updateResult = await BoardingHouseService.updateBoardingHouse(
        req.body,
      );
      res.status(201).json({ success: true, data: updateResult });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async delete(req, res) {
    try {
      const deleteResult = await BoardingHouseService.deleteBoardingHouse(
        req.body,
      );
      res.status(201).json({ success: true, data: deleteResult });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}
