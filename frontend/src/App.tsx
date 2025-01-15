import React from "react";
import { Link } from "react-router-dom";

const App = () => {
  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-700 p-6 shadow-xl">
      <nav className="container mx-auto">
        <ul className="flex items-center justify-center gap-8">
          <li>
            <Link
              to="/"
              className="rounded-xl px-5 py-2.5 font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-white/25 hover:shadow-lg focus:ring-2 focus:ring-white/50 active:scale-95"
            >
              Index
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="rounded-xl px-5 py-2.5 font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-white/25 hover:shadow-lg focus:ring-2 focus:ring-white/50 active:scale-95"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/todo"
              className="rounded-xl px-5 py-2.5 font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-white/25 hover:shadow-lg focus:ring-2 focus:ring-white/50 active:scale-95"
            >
              Todo
            </Link>
          </li>
          <li>
            <Link
              to="/go"
              className="rounded-xl px-5 py-2.5 font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-white/25 hover:shadow-lg focus:ring-2 focus:ring-white/50 active:scale-95"
            >
              Go
            </Link>
          </li>
          <li>
            <Link
              to="/signup"
              className="rounded-xl bg-white px-5 py-2.5 font-bold text-indigo-600 transition-all duration-300 hover:scale-105 hover:bg-white/90 hover:shadow-lg focus:ring-2 focus:ring-white/50 active:scale-95"
            >
              Signup
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="rounded-xl border-2 border-white px-5 py-2.5 font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-white hover:text-indigo-600 hover:shadow-lg focus:ring-2 focus:ring-white/50 active:scale-95"
            >
              Login
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default App;
