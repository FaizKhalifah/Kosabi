import express from "express";
import RentalController from "../controllers/rentalController";

const rentalController = new RentalController();
const rentalRouter = express.Router();
const baseUrl = "/rental";

rentalRouter.get(`${baseUrl}/`, rentalController.getAllRentals);
rentalRouter.get(`${baseUrl}/:id`, rentalController.getRentalById);
rentalRouter.get(`${baseUrl}/active`, rentalController.getActiveRentals);
rentalRouter.get(`${baseUrl}/finished`, rentalController.getFinishedRentals);
rentalRouter.get(`${baseUrl}/cancelled`, rentalController.getCanceledRentals);
rentalRouter.post(`${baseUrl}/`, rentalController.createRental);
rentalRouter.patch(`${baseUrl}/:id`, rentalController.updateRental);
rentalRouter.delete(`${baseUrl}/:id`, rentalController.deleteRental);

export default rentalRouter;
