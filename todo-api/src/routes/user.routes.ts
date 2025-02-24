import express from "express";
import userControllers from "../controllers/user.controllers";

const router = express.Router();

router.post("/create-task", userControllers.createTask);
router.get("/get-task", userControllers.getTasks);
router.put("/update-task/:id", userControllers.updateTask);
router.delete("/delete-task/:id", userControllers.deleteTask);

export default router;
