import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';

const App = () => {
  return (
    
      <div className='App'>
        <Link to="/">Index</Link>
        <br />
        <Link to="/about">About</Link>
        <br />
        <Link to="/todo">Todo</Link>
      </div>
    
  );
}

export default App;