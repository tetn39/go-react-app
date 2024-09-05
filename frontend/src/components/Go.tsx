import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Go = () => {

  type Task = {
    ID: number;
    Task: string;
    IsCompleted: boolean;
    CreatedAt: Date;
    UpdatedAt: Date;
  }

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
    }
    getTasks();
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // リロード回避


    try {
      const response = await axios.post("http://localhost:8080/tasks", {
        task: inputValue,
        isCompleted: false,
      });
      const newTask: Task = {
        ID: response.data.ID,
        Task: response.data.Task,
        IsCompleted: response.data.IsCompleted,
        CreatedAt: response.data.CreatedAt,
        UpdatedAt: response.data.UpdatedAt,
      }
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error("Error creating task:", error);
    }

    setInputValue("");
  };

  const handleEdit = async (id: number) => {
    try {
      const response = await axios.put(`http://localhost:8080/tasks/${id}`, {
        task: inputValue,
        isCompleted: false, // ここも変更可能にしたい場合は修正する
      });
      
      setTasks(tasks.map((task) => 
        task.ID === id ? response.data : task
      ));
    } catch (error) {
      console.error("Error editing task:", error);
    }
  
    setInputValue("");
  };
  
  
  const handleDelete = async (id: number) => {

    try {
      await axios.delete(`http://localhost:8080/tasks/${id}`);
      setTasks(tasks.filter(task => task.ID !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  

  return (
    <div>
      <h1>Goと接続</h1>

      <form onSubmit={(e) => handleSubmit(e)}>
        <input 
        type="text"
        onChange={(e) => handleChange(e)}
        />
        <button type="submit">送信</button>

      </form>
      <ul>
        {tasks.map((task) => {
            return (
            <li key={task.ID}>
              <input 
                type="text" 
                defaultValue={task.Task}
                onChange={(e) => handleChange(e)} 
              />

              <button onClick={() => handleEdit(task.ID)}>Edit</button>
              <button onClick={() => handleDelete(task.ID)} >Delete</button>
            </li>
            )
        })}
      </ul>
    </div>
  );
}
export default Go;