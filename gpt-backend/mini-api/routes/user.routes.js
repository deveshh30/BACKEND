import express from "express";

import createUser from "../controllers/createUser.js";
import getUsers from "../controllers/getUser.js";
import getUserById from "../controllers/getUserById.js";
import updateUser from "../controllers/updateUser.js";
import deleteUser from "../controllers/deleteUser.js";

const router = express.Router();

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
