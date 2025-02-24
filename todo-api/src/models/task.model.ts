import mongoose, { Document } from "mongoose";

interface TaskType extends Document {
  task: string;
  date: Date;
}

const TaskSchema = new mongoose.Schema<TaskType>(
  {
    task: {
      type: String,
    },
    date: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("task", TaskSchema);

export default Task;
