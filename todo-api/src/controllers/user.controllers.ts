import { Request, Response } from "express";
import Task from "../models/task.model";

class TaskController {
  async createTask(req: Request, res: Response): Promise<void> {
    const { task, date } = req.body;

    try {
      if (!task || !date) {
        res
          .status(400)
          .json({ message: "All fields are required!", status: 400 });
        return;
      }

      const newTask = new Task({
        task,
        date,
      });

      await newTask.save();

      res.status(201).json({
        data: newTask,
        message: "Created Task Successfully!",
        status: 201,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", status: 500 });
    }
  }

  async getTasks(req: Request, res: Response): Promise<void> {
    try {
      const tasks = await Task.find();

      res.status(200).json({
        data: tasks,
        message: "Tasks Retrieved Successfully!",
        status: 200,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", status: 500 });
    }
  }

  async getTaskById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const task = await Task.findById(id);

      if (!task) {
        res.status(404).json({ message: "Task not found!", status: 404 });
        return;
      }

      res.status(200).json({
        data: task,
        message: "Task Retrieved Successfully!",
        status: 200,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", status: 500 });
    }
  }

  async updateTask(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const updates = req.body;

    try {
      if (Object.keys(updates).length === 0) {
        res.status(400).json({
          message: "At least one field is required for update!",
          status: 400,
        });
        return;
      }

      const updatedTask = await Task.findByIdAndUpdate({ _id: id }, updates, {
        new: true,
      });

      if (!updatedTask) {
        res.status(404).json({ message: "Task not found!", status: 404 });
        return;
      }

      res.status(200).json({
        data: updatedTask,
        message: "Task Updated Successfully!",
        status: 200,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", status: 500 });
    }
  }

  async deleteTask(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const deletedTask = await Task.findByIdAndDelete(id);

      if (!deletedTask) {
        res.status(404).json({ message: "Task not found!", status: 404 });
        return;
      }

      res.status(200).json({
        message: "Task Deleted Successfully!",
        status: 200,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", status: 500 });
    }
  }
}

export default new TaskController();
