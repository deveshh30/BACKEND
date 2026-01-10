import cookieParser from 'cookie-parser';
import express from 'express';

const app = express(

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
})),

app.use(express.urlencoded({
    extended:"true",
    limit:"16kb"
})),

app.use(express.json({limit:"10kb"})),
app.use(express.static("public")),
app.use(cookieParser())


import userRouter from './routes/user.router.js';  //import the route

app.use("/users" , userRouter) // routes declaration

export {app} 