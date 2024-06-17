import { Router } from 'express';
import authController from '../controllers/authController.js';

const authRouter = Router();

authRouter.get('/register', authController.register_get);
authRouter.post('/register', authController.register_post);

authRouter.get('/login', authController.login_get);
authRouter.post('/login', authController.login_post);

authRouter.get('/logout', authController.logout_get);

export default authRouter;
