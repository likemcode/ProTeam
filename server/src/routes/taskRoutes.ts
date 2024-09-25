import { Router } from "express";
import { getTasks, createTask, updateTaskStatus, deleteTask } from "../controllers/taskcontroller";

const router = Router();

router.get("/", getTasks);
router.post("/", createTask);
router.put("/:id", updateTaskStatus);
router.delete("/:id", deleteTask);

export default router;