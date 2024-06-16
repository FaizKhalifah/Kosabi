import authController from "../controllers/authController.js";
import userController from "../controllers/userController.js";
import { Router } from "express";

const authRouter = Router();
authRouter.get('/register',authController.register_get);
authRouter.post('/register',authController.register_post);

authRouter.get('/login',authController.login_get);

export default authRouter;