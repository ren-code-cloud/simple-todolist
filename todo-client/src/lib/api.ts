import axios from "axios";

const clientURL = import.meta.env.VITE_APP_BASE_URL;
const api = axios.create({
  baseURL: clientURL || "http://localhost:8080/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const createTask = async (task: string, date: Date) => {
  try {
    const response = await api.post("/create-task", { task, date });

    if (response.status === 201) {
      const data = response.data;
      return data;
    } else {
      console.error("Failed to create task:", response.statusText);
    }
  } catch (error) {
    console.error("Error occurred while creating task:", error);
  }
};

export const updateTask = async (task: string, date: Date, id: string) => {
  try {
    const response = await api.put(`/update-task/${id}`, { task, date });

    if (response.status === 200) {
      const data = response.data;
      return data;
    } else {
      console.error("Failed to update task:", response.statusText);
    }
  } catch (error) {
    console.error("Error occurred while updating task:", error);
  }
};

export const getAllTask = async () => {
  try {
    const response = await api.get("/get-task");

    if (response.status === 200) {
      const data = response.data;

      return data;
    } else {
      console.error("Failed to fetch tasks:", response.statusText);
    }
  } catch (error) {
    console.error("Error occurred while fetching tasks:", error);
  }
};

export const deleteTask = async (id: string) => {
  try {
    const response = await api.delete(`/delete-task/${id}`);

    if (response.status === 200) {
      const data = response.data;
      return data;
    } else {
      console.error("Failed to delete task:", response.statusText);
    }
  } catch (error) {
    console.error("Error occurred while deleting task:", error);
  }
};
