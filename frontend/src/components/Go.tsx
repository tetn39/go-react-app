import axios from "axios";
import React, { useEffect, useState } from "react";

const Go = () => {
  type Task = {
    ID: number;
    Task: string;
    IsCompleted: boolean;
    CreatedAt: Date;
    UpdatedAt: Date;
  };

  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await axios.get("http://localhost:8080/tasks");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    getTasks();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // リロード回避
    if (!inputValue.trim()) {
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/tasks", {
        task: inputValue,
        isCompleted: false,
      });
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error("Error creating task:", error);
    }
    (e.target as HTMLFormElement).reset();
    setInputValue("");
  };

  const handleEdit = async (id: number) => {
    try {
      const response = await axios.put(`http://localhost:8080/tasks/${id}`, {
        task: inputValue,
      });

      setTasks(tasks.map((task) => (task.ID === id ? response.data : task)));
    } catch (error) {
      console.error("Error editing task:", error);
    }

    setInputValue("");
  };

  const handleCheck = async (id: number, task: string, check: boolean) => {
    try {
      const response = await axios.put(`http://localhost:8080/tasks/${id}`, {
        task: task,
        isCompleted: check,
      });
      setTasks(tasks.map((task) => (task.ID === id ? response.data : task)));
    } catch (error) {
      console.error("Error checking task:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/tasks/${id}`);
      setTasks(tasks.filter((task) => task.ID !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div>
      <div className="m-auto w-4/5 bg-purple-100 p-12">
        <h1>Goと接続</h1>

        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            onChange={(e) => handleChange(e)}
            className="w-80 border border-gray-400 p-2"
          />
          <button
            type="submit"
            className="ml-2 border border-gray-400 p-2 hover:bg-purple-300"
          >
            送信
          </button>
        </form>
        <ul>
          {tasks.map((task) => {
            return (
              <li key={task.ID} className="m-4">
                <input
                  type="text"
                  defaultValue={task.Task}
                  onChange={(e) => handleChange(e)}
                  disabled={task.IsCompleted}
                  className="border border-gray-400 p-2"
                />
                <span className="p-2">
                  {task.IsCompleted ? "完了" : "未完了"}
                </span>
                <input
                  type="checkbox"
                  checked={task.IsCompleted}
                  onChange={(e) =>
                    handleCheck(task.ID, task.Task, e.target.checked)
                  }
                  className="m-2 p-2"
                />

                <button
                  onClick={() => handleEdit(task.ID)}
                  className="m-4 border border-gray-400 p-2 hover:bg-purple-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(task.ID)}
                  className="m-4 border border-gray-400 p-2 hover:bg-purple-300"
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
export default Go;
