import { Router } from 'express';
import AuthController from './AuthController';

const authRouter = Router();

const controller = new AuthController();
authRouter.post('/signup', controller.signup);
authRouter.post('/login', controller.login);
authRouter.post('/logout', controller.logout);
authRouter.post('/refresh', controller.refreshAuthCookies);

export default authRouter;
