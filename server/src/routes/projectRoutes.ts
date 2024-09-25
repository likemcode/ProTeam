import { Router } from "express";
import { getProjects, getProjectById, createProject, updateProject, deleteProject } from "../controllers/projectController";

const router = Router();

router.get("/", getProjects);
router.post("/", createProject);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);
router.get("/:id", getProjectById);



export default router;