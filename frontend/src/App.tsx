import React, { useState } from 'react';

import './App.css';

function App() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);


  type Todo = {
    inputValue: string;
    id: number;
    checked: boolean;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
    setInputValue(e.target.value);


  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // リロード回避
    // 新しいtodoを作成
    const newTodo: Todo = {
      inputValue: inputValue,
      id: new Date().getTime(),
      checked: false,
    };

    setTodos([newTodo, ...todos]);
    setInputValue("");
    
  }

  const handleEdit = (id: number, inputValue: string) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.inputValue = inputValue;
      }
      return todo;
    });
    
    setTodos(newTodos);
  };

  const handleChecked = (id: number, checked: boolean) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.checked = !checked;
      }
      return todo;
    });
    
    setTodos(newTodos);
  }

  const handleDelete = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  }

  return (
    <div className="m-auto w-96 mt-32">
      <h2 className='text-3xl'>Todoリスト with typescript</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="text" onChange={(e) => handleChange(e)} className="p-2 rounded-xl border-2 border-black"/>
        <input type="submit" value="作成" className="border-2 border-black" />
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input 
            type="text" 
            onChange={(e) => handleEdit(todo.id, e.target.value)} 
            className="p-2 rounded-xl border-2 border-black"
            value={todo.inputValue}
            disabled={todo.checked}
            />

            <input 
            type="checkbox" 
            onChange={(e) => handleChecked(todo.id, todo.checked)} 
            className="p-2 rounded-xl border-2 border-black"
            />

            <button 
              className="border-2 border-black"
              onClick={() => handleDelete(todo.id)}
            >消</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
