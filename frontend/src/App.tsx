import React from "react";
import { Link } from "react-router-dom";

const App = () => {
  return (
    <header className="h-40 bg-zinc-200 pt-2">
      <ul className="flex justify-around bg-zinc-200 text-center">
        <li className="inline-block w-32 text-center hover:border hover:border-zinc-400">
          <Link to="/" className="block leading-10">
            Index
          </Link>
        </li>

        <li className="inline-block w-32 text-center hover:border hover:border-zinc-400">
          <Link to="/about" className="block leading-10">
            About
          </Link>
        </li>

        <li className="inline-block w-32 text-center hover:border hover:border-zinc-400">
          <Link to="/todo" className="block leading-10">
            Todo
          </Link>
        </li>
        <li className="inline-block w-32 text-center hover:border hover:border-zinc-400">
          <Link to="/go" className="block leading-10">
            Go
          </Link>
        </li>
        <li className="inline-block w-32 text-center hover:border hover:border-zinc-400">
          <Link to="/signup" className="block leading-10">
            Signup
          </Link>
        </li>
        <li className="inline-block w-32 text-center hover:border hover:border-zinc-400">
          <Link to="/login" className="block leading-10">
            Login
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default App;
