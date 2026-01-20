import express from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get("/verify", verifyJWT, ( req , res ) => {
    return res.status(200)
    .json({
        message : "profile fetched successfully",
        user : req.user,
    });
});

export default userRouter;