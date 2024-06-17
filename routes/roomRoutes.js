import { Router } from "express";
import roomController from "../controllers/roomController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const roomRouter = Router();

roomRouter.get('/rooms',authMiddleware.requireAuth, roomController.index);
roomRouter.get('/rooms/create',authMiddleware.requireAuth,roomController.create);
roomRouter.post('/rooms/create',authMiddleware.requireAuth,roomController.store);
roomRouter.get('/rooms/edit/:id',authMiddleware.requireAuth,roomController.edit);
roomRouter.post('/rooms/edit/:id',authMiddleware.requireAuth,roomController.update);
roomRouter.get('/rooms/delete/:id',authMiddleware.requireAuth,roomController.destroy);
roomRouter.get('/rooms/:id',authMiddleware.requireAuth,roomController.show);

export default roomRouter;
