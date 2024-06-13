import { Router } from "express";
import roomController from "../controllers/roomController.js";

const roomRouter = Router();

roomRouter.get('/rooms', roomController.index);
roomRouter.get('/rooms/create', roomController.create);
roomRouter.post('/rooms/create', roomController.store);
roomRouter.get('/rooms/edit/:nomor_kamar', roomController.edit);
roomRouter.post('/rooms/edit/:nomor_kamar', roomController.update);
roomRouter.get('/rooms/delete/:nomor_kamar', roomController.destroy);
roomRouter.get('/rooms/:nomor_kamar',roomController.show);

export default roomRouter;
