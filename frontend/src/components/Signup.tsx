import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(
        "http://localhost:8080/signup",
        {
          Email: email,
          Password: password,
        },
        { withCredentials: true },
      );

      if (response.status === 200) {
        console.log("アカウント登録成功");
        try {
          const loginResponse = await axios.post(
            "http://localhost:8080/login",
            {
              Email: email,
              Password: password,
            },
            { withCredentials: true },
          );

          if (loginResponse.status === 200) {
            const validateResponse = await axios.get(
              "http://localhost:8080/validate",
              { withCredentials: true },
            );

            if (validateResponse.status === 200) {
              console.log("ログイン成功");
              navigate("/");
            }
          }
        } catch (loginError) {
          console.log("自動ログインに失敗:", loginError);
          setError("ログインに失敗しました。もう一度お試しください。");
          navigate("/login");
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          console.log("既に登録済みのメールアドレスです");
          try {
            const loginResponse = await axios.post(
              "http://localhost:8080/login",
              {
                Email: email,
                Password: password,
              },
              { withCredentials: true },
            );

            if (loginResponse.status === 200) {
              const validateResponse = await axios.get(
                "http://localhost:8080/validate",
                { withCredentials: true },
              );

              if (validateResponse.status === 200) {
                console.log("既存アカウントでログイン成功");
                navigate("/");
              }
            }
          } catch (loginError) {
            console.log("ログインに失敗:", loginError);
            setError("パスワードが間違っています。");
            navigate("/login");
          }
        } else {
          setError("エラーが発生しました。もう一度お試しください。");
        }
      } else {
        console.log(error);
        setError("予期せぬエラーが発生しました。");
      }
    }
  }

  return (
    <div className="container mx-auto max-w-md px-6 py-12">
      <h1 className="mb-8 text-center text-3xl font-bold text-indigo-600">
        アカウント登録
      </h1>
      {error && (
        <div className="mb-4 rounded-lg bg-red-100 p-4 text-red-700">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            メールアドレス
          </label>
          <input
            type="email"
            className="mt-1 block w-full rounded-xl border border-gray-300 px-4 py-3 shadow-sm transition duration-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            パスワード
          </label>
          <input
            type="password"
            className="mt-1 block w-full rounded-xl border border-gray-300 px-4 py-3 shadow-sm transition duration-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-purple-700 px-6 py-3 font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 active:scale-95"
        >
          登録する
        </button>
      </form>
    </div>
  );
};

export default Signup;
