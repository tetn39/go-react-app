import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("http://localhost:8080/validate", {
          withCredentials: true,
        });
        if (response.status === 200) {
          setIsLoggedIn(true);
          getTasks();
        }
      } catch (error) {
        console.log("認証エラー:", error);
        setIsLoggedIn(false);
      }
    };
    checkAuth();
  }, []);

  const getTasks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/tasks", {
        withCredentials: true,
      });
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    try {
      const response = await axios.post(
        "http://localhost:8080/tasks",
        {
          task: inputValue,
          isCompleted: false,
        },
        { withCredentials: true },
      );
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error("Error creating task:", error);
    }
    (e.target as HTMLFormElement).reset();
    setInputValue("");
  };

  const handleEdit = async (id: number) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/tasks/${id}`,
        {
          task: inputValue,
        },
        { withCredentials: true },
      );
      setTasks(tasks.map((task) => (task.ID === id ? response.data : task)));
    } catch (error) {
      console.error("Error editing task:", error);
    }
    setInputValue("");
  };

  const handleCheck = async (id: number, task: string, check: boolean) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/tasks/${id}`,
        {
          task: task,
          isCompleted: check,
        },
        { withCredentials: true },
      );
      setTasks(tasks.map((task) => (task.ID === id ? response.data : task)));
    } catch (error) {
      console.error("Error checking task:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/tasks/${id}`, {
        withCredentials: true,
      });
      setTasks(tasks.filter((task) => task.ID !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container mx-auto max-w-3xl px-4 py-12">
          <h1 className="mb-8 text-center text-4xl font-bold text-purple-800">
            Todo List
          </h1>
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <div className="text-center">
              <p className="mb-6 text-lg text-gray-600">
                タスクの管理にはログインが必要です
              </p>
              <div className="flex justify-center gap-4">
                <Link
                  to="/signup"
                  className="rounded-lg bg-purple-600 px-6 py-3 font-bold text-white transition-all hover:bg-purple-700 active:scale-95"
                >
                  新規登録
                </Link>
                <Link
                  to="/login"
                  className="rounded-lg border-2 border-purple-600 px-6 py-3 font-bold text-purple-600 transition-all hover:bg-purple-50 active:scale-95"
                >
                  ログイン
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto max-w-3xl px-4 py-12">
        <h1 className="mb-8 text-center text-4xl font-bold text-purple-800">
          Todo List
        </h1>

        <div className="rounded-lg bg-white p-6 shadow-lg">
          <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
            <input
              type="text"
              onChange={handleChange}
              placeholder="新しいタスクを入力..."
              className="flex-1 rounded-lg border-2 border-purple-200 p-3 focus:border-purple-400 focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-lg bg-purple-600 px-6 py-3 text-white transition-all hover:bg-purple-700 active:scale-95"
            >
              追加
            </button>
          </form>

          <ul className="space-y-3">
            {tasks.map((task) => (
              <li
                key={task.ID}
                className={`rounded-lg border border-gray-100 bg-gray-50 p-4 transition-all ${
                  task.IsCompleted ? "opacity-75" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={task.IsCompleted}
                    onChange={(e) =>
                      handleCheck(task.ID, task.Task, e.target.checked)
                    }
                    className="size-5 rounded border-purple-300 text-purple-600 focus:ring-purple-500"
                  />
                  <input
                    type="text"
                    defaultValue={task.Task}
                    onChange={handleChange}
                    disabled={task.IsCompleted}
                    className={`flex-1 rounded bg-transparent p-2 focus:bg-white focus:outline-none focus:ring-1 focus:ring-purple-400 ${
                      task.IsCompleted ? "text-gray-500 line-through" : ""
                    }`}
                  />
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${
                      task.IsCompleted
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {task.IsCompleted ? "完了" : "未完了"}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(task.ID)}
                      disabled={task.IsCompleted}
                      className="rounded-lg bg-blue-500 px-4 py-2 text-white transition-all hover:bg-blue-600 active:scale-95 disabled:opacity-50"
                    >
                      編集
                    </button>
                    <button
                      onClick={() => handleDelete(task.ID)}
                      className="rounded-lg bg-red-500 px-4 py-2 text-white transition-all hover:bg-red-600 active:scale-95"
                    >
                      削除
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Go;
