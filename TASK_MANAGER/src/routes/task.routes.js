import { Router } from "express";
import { createTask, getAllTasks, getTaskById } from "../controllers/task.controller.js";

const router = Router();

router.post("/", createTask)
router.get("/", getAllTasks)
router.get("/id", getTaskById)

export default router;