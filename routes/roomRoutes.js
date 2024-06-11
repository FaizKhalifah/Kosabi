import { Router } from "express";
import roomController from "../controllers/roomController.js";

const router = Router();
router.get('/rooms',roomController.index);  
router.get('/rooms/:id',roomController.show);
router.get('/rooms/create',roomController.create);  
router.post('/rooms/create',roomController.store);
router.get('/rooms/edit/:id',roomController.edit);
router.post('/rooms/edit/:id',roomController.update);
router.get('/rooms/delete/:id',roomController.destroy);

export default router;