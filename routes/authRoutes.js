import authController from "../controllers/authController.js";
import { Router } from "express";

const authRouter = Router();

authRouter.post('/register',authController.register_post);

export default authRouter;