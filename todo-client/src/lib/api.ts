export const createTask = async (task: string, date: Date) => {
  try {
    const response = await fetch("http://localhost:8080/api/create-task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task, date }),
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Task created successfully:", data);
    } else {
      console.error("Failed to create task:", response.statusText);
    }
  } catch (error) {
    console.error("Error occurred while creating task:", error);
  }
};

export const updateTask = async (task: string, date: Date, id: string) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/update-task/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task, date }),
        credentials: "include",
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log("Task created successfully:", data);
    } else {
      console.error("Failed to create task:", response.statusText);
    }
  } catch (error) {
    console.error("Error occurred while creating task:", error);
  }
};

export const getAllTask = async () => {
  try {
    const response = await fetch(`http://localhost:8080/api/get-task`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Task created successfully:", data);
      return data;
    } else {
      console.error("Failed to create task:", response.statusText);
    }
  } catch (error) {
    console.error("Error occurred while creating task:", error);
  }
};

export const deleteTask = async (id: string) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/delete-task/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log("Task created successfully:", data);
    } else {
      console.error("Failed to create task:", response.statusText);
    }
  } catch (error) {
    console.error("Error occurred while creating task:", error);
  }
};
