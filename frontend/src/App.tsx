import React from "react";
import { Link } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <Link to="/">Index</Link>
      <br />
      <Link to="/about">About</Link>
      <br />
      <Link to="/todo">Todo</Link>
      <br />
      <Link to="/go">Go</Link>
    </div>
  );
};

export default App;
