import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";

const adminRouter = Router();

adminRouter.get('/dashboard',authMiddleware.requireAuth,(req,res)=>{
    res.render('dashboard/index');
})

export default adminRouter;