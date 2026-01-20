import express from 'express';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.router.js';

export const app = express();

app.get()

app.use(express.json());

app.use("/api/v1/auth", authRoutes);

app.use("/api/v1/users", userRoutes);
