import express from "express";
import BoardingHouseController from "../controllers/boardingHouseController";

const boardingHouseController = new BoardingHouseController();
const boardingHouseRouter = express.Router();
const baseUrl = "/boardingHouse";

boardingHouseRouter.get(`${baseUrl}/`, boardingHouseController.getAll);
boardingHouseRouter.get(`${baseUrl}/:id`, boardingHouseController.getById);
boardingHouseRouter.post(`${baseUrl}/`, boardingHouseController.create);
boardingHouseRouter.put(`${baseUrl}/:id`, boardingHouseController.update);
boardingHouseRouter.delete(`${baseUrl}/:id`, boardingHouseController.delete);

export default boardingHouseRouter;
