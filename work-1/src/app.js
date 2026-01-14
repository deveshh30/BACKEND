import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRouter from "./routes/user.router.js";

const app = express();

/* ---------- MIDDLEWARES ---------- */

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}));

app.use(express.urlencoded({
  extended: true,
  limit: "16kb",
}));

app.use(express.json({ limit: "10kb" }));

app.use(express.static("public"));

app.use(cookieParser());

/* ---------- ROUTES ---------- */

app.use("/users", userRouter);

export default app;
