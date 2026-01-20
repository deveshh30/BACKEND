import express from 'express';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.router.js';
import { registerUser, loginUser } from './controllers/auth.controller.js';
export const app = express();

app.get("/", ( req , res ) => {
    res.send("server is running");
});

app.use(express.json());

app.use("/api/v1/auth", authRouter);

app.use("/api/v1/users", userRouter);

app.post("/registerUser", registerUser);
app.post("/loginUser", loginUser);
