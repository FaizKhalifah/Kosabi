import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import roomController from "../controllers/roomController.js";

const adminRouter = Router();

adminRouter.get('/dashboard',authMiddleware.requireAuth,(req,res)=>{
    res.render('dashboard/index');
})

adminRouter.get('/admin/rooms',authMiddleware.requireAuth,authMiddleware.checkAdmin,roomController.index);
adminRouter.get('/admin/rooms/create',authMiddleware.requireAuth,authMiddleware.checkAdmin,roomController.create);
adminRouter.post('/admin/rooms/create',authMiddleware.requireAuth,authMiddleware.checkAdmin,roomController.store);
adminRouter.get('/admin/rooms/edit/:id',authMiddleware.requireAuth,authMiddleware.checkAdmin,roomController.edit);
adminRouter.post('/admin/rooms/edit/:id',authMiddleware.requireAuth,authMiddleware.checkAdmin,roomController.update);
adminRouter.get('/admin/rooms/delete/:id',authMiddleware.requireAuth,authMiddleware.checkAdmin,roomController.destroy);
adminRouter.get('/admin/rooms/:id',authMiddleware.requireAuth,authMiddleware.checkAdmin,roomController.show);
export default adminRouter;