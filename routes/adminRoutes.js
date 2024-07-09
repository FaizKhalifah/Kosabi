import authMiddleware from "../middleware/authMiddleware.js";
import { Router } from "express";

const adminRouter = Router();

adminRouter.get('/dashboard',authMiddleware.requireAuth,authMiddleware.checkRole("admin"),(req,res)=>{
    res.render('admin/index')
})   

export default adminRouter;