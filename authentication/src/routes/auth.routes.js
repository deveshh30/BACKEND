import express from 'express';
import {asyncHandler} from "../utils/asyncHandler.js"
import {registerUser, loginUser} from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.post("/register", asyncHandler(registerUser));

authRouter.post("/login", asyncHandler(loginUser));

export default authRouter;
