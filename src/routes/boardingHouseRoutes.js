import express from "express";
import BoardingHouseController from "../controllers/boardingHouseController.js";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const uniqueName =
      `${Date.now()}-${Math.round(Math.random() * 1e9)}` +
      path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
});

const boardingHouseController = new BoardingHouseController();
const boardingHouseRouter = express.Router();
const baseUrl = "/boardingHouse";

boardingHouseRouter.get(`${baseUrl}/`, boardingHouseController.getAll);
boardingHouseRouter.post(
  `${baseUrl}/`,
  upload.array("photos"),
  boardingHouseController.create,
);
boardingHouseRouter.get(`${baseUrl}/:id`, boardingHouseController.getById);
boardingHouseRouter.put(
  `${baseUrl}/:id`,
  upload.array("photos"),
  boardingHouseController.update,
);
boardingHouseRouter.delete(`${baseUrl}/:id`, boardingHouseController.delete);

export default boardingHouseRouter;
