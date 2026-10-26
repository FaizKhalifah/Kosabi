import UserController from "../controllers/userController.js";
import express from "express";

const userController = new UserController();
const userRouter = express.Router();
const baseUrl = "/api/users";

userRouter.get(`${baseUrl}/`, userController.getAllUsers);
userRouter.get(`${baseUrl}/tenants`, userController.getAllTenants);
userRouter.get(`${baseUrl}/:id`, userController.getUserById);
userRouter.patch(`${baseUrl}/changeRole/:id`, userController.changeUserRole);
userRouter.put(`${baseUrl}/:id`, userController.updateUserProfile);

export default userRouter;
