import React from 'react';
import './App.css';
import { Link, Route, Routes } from 'react-router-dom';

import Home from "./components/Home";
import About from "./components/About";
import Todo from "./components/Todo";


const App = () => {
  return (
    
      <div className='App'>
        <Link to="/">Index</Link>
        <br />
        <Link to="/about">About</Link>
        <br />
        <Link to="/todo">Todo</Link>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/todo" element={<Todo />} />
        </Routes>
      </div>
    
  );
}

export default App;