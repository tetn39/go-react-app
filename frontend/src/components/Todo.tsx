import React, { useState } from "react";


function Todo() {
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
    <div className="m-auto mt-32 w-96">
      <h2 className='text-3xl'>Todoリスト with typescript</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="text" onChange={(e) => handleChange(e)} className="rounded-xl border-2 border-black p-2"/>
        <input type="submit" value="作成" className="border-2 border-black" />
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input 
            type="text" 
            onChange={(e) => handleEdit(todo.id, e.target.value)} 
            className="rounded-xl border-2 border-black p-2"
            value={todo.inputValue}
            disabled={todo.checked}
            />

            <input 
            type="checkbox" 
            onChange={(e) => handleChecked(todo.id, todo.checked)} 
            className="rounded-xl border-2 border-black p-2"
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

export default Todo;
