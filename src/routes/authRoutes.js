import express from "express";
import AuthController from "../controllers/authController.js";

const authController = new AuthController();
const authRouter = express.Router();
const baseUrl = "/auth";

authRouter.post(`${baseUrl}/register/admin`, authController.registerAdmin);
authRouter.post(`${baseUrl}/register/tenant`, authController.registerTenant);
authRouter.post(`${baseUrl}/login`, authController.login);
authRouter.patch(
  `${baseUrl}/changePassword/:id`,
  authController.changePassword,
);

export default authRouter;
