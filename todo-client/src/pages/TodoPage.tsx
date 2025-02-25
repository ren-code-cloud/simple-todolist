import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import DatePicker from "../components/DatePicker";
import { createTask, deleteTask, getAllTask, updateTask } from "../lib/api";

interface TodoAppProps {}

const TodoPage: React.FC<TodoAppProps> = () => {
  const [tasks, setTasks] = useState<
    { task: string; date: Date; _id: string }[] | []
  >([]);
  const [taskInput, setTaskInput] = useState<string>("");
  const [date, setDate] = React.useState<Date | undefined>();
  const [update, setUpdate] = React.useState<boolean>(false);
  const [taskId, setTaskId] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);

  const fetchAll = async () => {
    const response = await getAllTask();

    setTasks(response.data);
  };

  React.useEffect(() => {
    fetchAll();

    return () => {
      setTasks([]);
    };
  }, []);

  const handleAddTask = async () => {
    if (!tasks || !date) {
      return;
    }
    await createTask(taskInput, date);
    setTaskInput("");
    setDate(undefined);
    fetchAll();
  };

  const handleEditTask = (task: string, date: Date, id: string) => {
    setTaskInput(task);
    setDate(date);
    setTaskId(id);
    setUpdate(true);
  };

  const handleUpdateTask = async () => {
    if (!date || !taskId) {
      alert("Date is required");
      return;
    }
    setLoading(true);
    await updateTask(taskInput, date, taskId);
    fetchAll();
    setLoading(false);

    setTaskInput("");
    setDate(undefined);
    setTaskId("");
  };

  const handleDeleteTask = async (taskToDelete: string) => {
    await deleteTask(taskToDelete);
    fetchAll();
  };

  return (
    <React.Suspense fallback={<h1>Loading...</h1>}>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <Card className="w-full max-w-xl">
          <CardHeader>
            <CardTitle>To-Do List</CardTitle>
            <CardDescription>Manage your daily tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <div className="flex gap-2">
                <Input
                  type="text"
                  value={taskInput}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setTaskInput(e.target.value)
                  }
                  placeholder="Enter a new task"
                  className="mb-4"
                />
                <DatePicker date={date ?? new Date()} setDate={setDate} />
              </div>

              {update ? (
                <Button
                  onClick={handleUpdateTask}
                  className={`${
                    loading ? "cursor-not-allowed" : ""
                  } w-full bg-blue-500 text-white p-2 rounded`}
                >
                  {loading ? "Loading..." : "Submit"}
                </Button>
              ) : (
                <Button
                  onClick={handleAddTask}
                  className="w-full bg-blue-500 text-white p-2 rounded"
                >
                  Add Task
                </Button>
              )}

              <ul className="mt-4">
                {tasks.length > 0 ? (
                  tasks.map((item, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center p-2 border-b"
                    >
                      <div className="w-full text-left  flex justify-between items-center">
                        <span className="w-full">{item.task}</span>
                        <span className=" w-full">
                          {new Date(item.date).toLocaleDateString("en-PH", {
                            timeZone: "Asia/Manila",
                          })}
                        </span>
                      </div>
                      <div className="flex ">
                        <Button
                          onClick={() =>
                            handleEditTask(item.task, item.date, item._id)
                          }
                          className="ml-2 text-blue-500"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDeleteTask(item._id)}
                          className="ml-2 text-red-500"
                        >
                          Delete
                        </Button>
                      </div>
                    </li>
                  ))
                ) : (
                  <li>No tasks yet!</li>
                )}
              </ul>
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-center text-sm">Manage your tasks easily</p>
          </CardFooter>
        </Card>
      </div>
    </React.Suspense>
  );
};

export default TodoPage;
