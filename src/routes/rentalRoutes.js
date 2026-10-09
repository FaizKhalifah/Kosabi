import express from "express";
import RentalController from "../controllers/rentalController.js";

const rentalController = new RentalController();
const rentalRouter = express.Router();
const baseUrl = "/api/rental";

rentalRouter.get(`${baseUrl}/`, rentalController.getAllRentals);
rentalRouter.get(`${baseUrl}/active`, rentalController.getActiveRentals);
rentalRouter.get(`${baseUrl}/finished`, rentalController.getFinishedRentals);
rentalRouter.get(`${baseUrl}/cancelled`, rentalController.getCanceledRentals);
rentalRouter.get(`${baseUrl}/:id`, rentalController.getRentalById);
rentalRouter.post(`${baseUrl}/`, rentalController.createRental);
rentalRouter.patch(`${baseUrl}/:id`, rentalController.updateRental);
rentalRouter.delete(`${baseUrl}/:id`, rentalController.deleteRental);

export default rentalRouter;
