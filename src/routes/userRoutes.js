import UserController from "../controllers/userController.js";
import express from "express";

const userController = new UserController();
const userRouter = express.Router();
const baseUrl = "/user";

userRouter.get(`${baseUrl}/:id`, userController.getUserById);
userRouter.patch(`${baseUrl}/changeRole/:id`, userController.changeUserRole);
userRouter.put(`${baseUrl}/:id`, userController.updateUserProfile);

export default userRouter;
