import { Router } from "express";
import roomController from "../controllers/roomController.js";
import { requireAuth } from "../middlewares/authMiddleware.js";
const roomRouter = Router();

roomRouter.get('/rooms',requireAuth, roomController.index);
roomRouter.get('/rooms/create',requireAuth,roomController.create);
roomRouter.post('/rooms/create',requireAuth,roomController.store);
roomRouter.get('/rooms/edit/:id',requireAuth,roomController.edit);
roomRouter.post('/rooms/edit/:id',requireAuth,roomController.update);
roomRouter.get('/rooms/delete/:id',requireAuth,roomController.destroy);
roomRouter.get('/rooms/:id',requireAuth,roomController.show);

export default roomRouter;
