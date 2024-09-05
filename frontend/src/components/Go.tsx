import axios from 'axios';
import React, { useState } from 'react';

const Go = () => {

  type Task = {
    id: number;
    task: string;
    isCompleted: boolean;
    createdAt: Date;
    updatedAt: Date;
  }

  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // リロード回避
    // 新しいtodoを作成
    const newTask: Task = {
      id: new Date().getTime(),
      task: inputValue,
      isCompleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    try {
      const response = await axios.post("http://localhost:8080/tasks", {
        task: newTask.task,
        isCompleted: newTask.isCompleted,
      });
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
        task.id === id ? response.data : task
      ));
    } catch (error) {
      console.error("Error editing task:", error);
    }
  
    setInputValue("");
  };
  
  
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/tasks/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
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
            <li key={task.id}>
              <input 
                type="text" 
                defaultValue={task.task}  // taskごとに固有の値
                onChange={(e) => handleChange(e)} 
              />


              <button onClick={() => handleEdit(task.id)}>Edit</button>
              <button onClick={() => handleDelete(task.id)} >Delete</button>
            </li>
            )
        })}
      </ul>
    </div>
  );
}
export default Go;