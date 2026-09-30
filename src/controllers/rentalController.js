import RentalService from "../services/rentalService.js";

export default class RentalController {
  async getAllRentals(req, res) {
    try {
      const rentals = await RentalService.getAllRentals();
      res.status(200).json(rentals);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getRentalById(req, res) {
    try {
      const rental = await RentalService.getRentalById(req.params.id);
      res.status(200).json(rental);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async createRental(req, res) {
    try {
      const createResult = await RentalService.createRental(req.body);
      res.status(201).json({ success: true, data: createResult });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async updateRental(req, res) {
    try {
      const updateResult = await RentalService.updateRental(
        req.params.id,
        req.body,
      );
      res.status(201).json({ success: true, data: updateResult });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async deleteRental(req, res) {
    try {
      const deleteResult = await RentalService.deleteRental(req.params.id);
      res.status(201).json({ success: true, data: deleteResult });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getActiveRentals(req, res) {
    try {
      const activeRentals = await RentalService.getActiveRentals();
      res.status(201).json(activeRentals);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getFinishedRentals(req, res) {
    try {
      const finishedRentals = await RentalService.getFinishedRentals();
      res.status(201).json(finishedRentals);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getCanceledRentals(req, res) {
    try {
      const canceledRentals = await RentalService.getCanceledRentals();
      res.status(201).json(canceledRentals);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}
