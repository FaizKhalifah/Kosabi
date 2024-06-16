import { Router } from "express";
import roomController from "../controllers/roomController.js";

const roomRouter = Router();

roomRouter.get('/rooms', roomController.index);
roomRouter.get('/rooms/create', roomController.create);
roomRouter.post('/rooms/create', roomController.store);
roomRouter.get('/rooms/edit/:id', roomController.edit);
roomRouter.post('/rooms/edit/:id', roomController.update);
roomRouter.get('/rooms/delete/:id', roomController.destroy);
roomRouter.get('/rooms/:id',roomController.show);

export default roomRouter;
