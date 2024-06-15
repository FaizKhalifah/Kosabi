import authController from "../controllers/authController.js";
import { Router } from "express";

const authRouter = Router();
authRouter.get('/register',authController.register_get);

export default authRouter;