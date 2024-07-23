import authMiddleware from "../middleware/authMiddleware.js";
import { Router } from "express";
import roomController from "../controllers/roomController.js";
import usersController from "../controllers/usersController.js";
import orderController from "../controllers/orderController.js";
import incomeController from "../controllers/incomeController.js";

const adminRouter = Router();

adminRouter.get('/dashboard',authMiddleware.requireAuth,authMiddleware.checkRole("admin"),(req,res)=>{
    res.render('admin/index')
})   

adminRouter.get('/dashboard/rooms',authMiddleware.requireAuth,authMiddleware.checkRole("admin"),roomController.index);
adminRouter.get('/dashboard/rooms/add',authMiddleware.requireAuth,authMiddleware.checkRole("admin"),roomController.create);
adminRouter.post('/dashboard/rooms/add',authMiddleware.requireAuth,authMiddleware.checkRole("admin"),roomController.store);
adminRouter.get('/dashboard/rooms/edit/:id',authMiddleware.requireAuth,authMiddleware.checkRole("admin"),roomController.edit);
adminRouter.post('/dashboard/rooms/edit',authMiddleware.requireAuth,authMiddleware.checkRole("admin"),roomController.update);
adminRouter.get('/dashboard/rooms/delete/:id',authMiddleware.requireAuth,authMiddleware.checkRole("admin"),roomController.destroy);

adminRouter.get('/dashboard/orders',authMiddleware.requireAuth,authMiddleware.checkRole("admin"),orderController.index);

adminRouter.get('/dashboard/income',authMiddleware.requireAuth,authMiddleware.checkRole("admin"),incomeController.index);

adminRouter.get('/dashboard/users',authMiddleware.requireAuth,authMiddleware.checkRole("admin"),usersController.index);
export default adminRouter;