import express from "express";
import RoomController from "../controllers/roomController.js";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/rooms/");
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

const roomController = new RoomController();
const roomRouter = express.Router();
const baseUrl = "/rooms";

roomRouter.get(`${baseUrl}/`, roomController.getAllRooms);
roomRouter.post(
  `${baseUrl}/`,
  upload.array("photos"),
  roomController.createRoom,
);
roomRouter.get(`${baseUrl}/:id`, roomController.getRoomById);
roomRouter.put(
  `${baseUrl}/:id`,
  upload.array("photos"),
  roomController.updateRoom,
);
roomRouter.delete(`${baseUrl}/:id`, roomController.deleteRoom);
roomRouter.get(`${baseUrl}/available/:id`, roomController.getAvailableRooms);
roomRouter.get(`${baseUrl}/occupied/:id`, roomController.getOccupiedRooms);
roomRouter.get(`${baseUrl}/maintained/:id`, roomController.getMaintainedRooms);
roomRouter.get(`${baseUrl}/reserved/:id`, roomController.getReservedRooms);

export default roomRouter;
