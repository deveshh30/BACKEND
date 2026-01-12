import express from "express";
import User from "../models/user.model.js";
import { Router } from "express";

const router = express.Router();

router.post("/", async(req,res) => {
    try {
        const {name, email, age} = req.body;

        const user = await user.create({
            name, 
            email,
            age
        });
        res.status(201).json({
            success : true,
            data : user
            
        });
        
    } catch (error) {
        res.status(400).json({
            success:false,
            data: error.message
        });
    }
});


router.get("/", async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      success: true,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);




export default router;
