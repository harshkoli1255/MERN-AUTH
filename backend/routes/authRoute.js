import express from 'express';
import { login, logout, signup, verifyEmail, forgotPassword, resetPassword, checkAuth, generateAndSendVerificationCode } from '../controllers/authController.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const authRouter = express.Router();

authRouter.route("/signup").post(signup)
authRouter.route("/login").post(login)
authRouter.route("/logout").post(logout)
authRouter.route('/verify-email').post(verifyEmail);
authRouter.route('/forgot-password').post(forgotPassword);
authRouter.route('/reset-password/:token').post(resetPassword);
authRouter.route('/check-auth').get(verifyToken, checkAuth);
authRouter.route('/resend-verificationToken').post(generateAndSendVerificationCode);

export default authRouter;