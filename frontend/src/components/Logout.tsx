import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      const response = await axios.post(
        "http://localhost:8080/logout",
        {},
        { withCredentials: true },
      );
      if (response.status === 200) {
        localStorage.removeItem("userID");
        console.log(response.data["message"]);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container mx-auto max-w-md px-6 py-12">
      <h1 className="mb-8 text-center text-3xl font-bold text-indigo-600">
        ログアウト
      </h1>
      <button
        onClick={handleLogout}
        className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-purple-700 px-6 py-3 font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 active:scale-95"
      >
        ログアウトする
      </button>
    </div>
  );
};

export default Logout;
