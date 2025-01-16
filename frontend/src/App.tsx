import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

interface User {
  id: number;
  email: string;
}

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const checkAuth = async () => {
    try {
      const response = await axios.get("http://localhost:8080/validate", {
        withCredentials: true,
      });
      if (response.status === 200) {
        console.log("認証成功:", response.data);
        setIsLoggedIn(true);
        setUser(response.data.user);
      }
    } catch (error) {
      console.log("認証エラー:", error);
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  useEffect(() => {
    checkAuth();
  }, [location]);

  useEffect(() => {
    console.log("認証状態:", isLoggedIn);
    console.log("ユーザー情報:", user);
  }, [isLoggedIn, user]);

  async function handleLogout() {
    try {
      const response = await axios.post(
        "http://localhost:8080/logout",
        {},
        { withCredentials: true },
      );
      if (response.status === 200) {
        localStorage.removeItem("userID");
        setIsLoggedIn(false);
        setUser(null);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-700 p-6 shadow-xl">
      <nav className="container mx-auto">
        <ul className="flex h-[52px] items-center justify-center gap-8">
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
              to="/go"
              className="rounded-xl px-5 py-2.5 font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-white/25 hover:shadow-lg focus:ring-2 focus:ring-white/50 active:scale-95"
            >
              ToDo
            </Link>
          </li>
          {!isLoggedIn ? (
            <>
              <li className="ml-auto">
                <Link
                  to="/signup"
                  className="rounded-xl bg-white px-5 py-2.5 font-bold text-indigo-600 transition-all duration-300 hover:scale-105 hover:bg-indigo-50 hover:shadow-lg focus:ring-2 focus:ring-white/50 active:scale-95"
                >
                  新規登録
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="rounded-xl border-2 border-white px-5 py-2.5 font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-white/25 hover:shadow-lg focus:ring-2 focus:ring-white/50 active:scale-95"
                >
                  ログイン
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="ml-auto">
                <span className="rounded-xl bg-white/10 px-5 py-2.5 font-bold text-white">
                  {user?.email}
                </span>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="rounded-xl border-2 border-white px-5 py-2.5 font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-white/25 hover:shadow-lg focus:ring-2 focus:ring-white/50 active:scale-95"
                >
                  ログアウト
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default App;
