import authMiddleware from "../middleware/authMiddleware.js";
import { Router } from "express";
   
const userRouter = Router();

userRouter.get('/',authMiddleware.requireAuth,authMiddleware.checkRole("user"),(req,res)=>{
    res.render('user/index');
})

export default userRouter;