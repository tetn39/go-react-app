import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="mb-8 bg-gradient-to-r from-white to-gray-100 bg-clip-text text-6xl font-extrabold text-transparent">
            TODOアプリへようこそ
          </h1>
          <p className="mb-12 text-2xl font-light text-white">
            シンプルで使いやすいTODO管理ツール
          </p>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-xl bg-white/10 p-8 backdrop-blur-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <h2 className="mb-4 text-2xl font-bold text-white">タスク管理</h2>
              <p className="text-gray-200">
                簡単にタスクの追加・編集・削除ができます
              </p>
            </div>

            <div className="rounded-xl bg-white/10 p-8 backdrop-blur-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <h2 className="mb-4 text-2xl font-bold text-white">進捗管理</h2>
              <p className="text-gray-200">
                タスクの完了状況を一目で確認できます
              </p>
            </div>

            <div className="rounded-xl bg-white/10 p-8 backdrop-blur-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <h2 className="mb-4 text-2xl font-bold text-white">データ保存</h2>
              <p className="text-gray-200">
                タスクはサーバーに安全に保存されます
              </p>
            </div>
          </div>

          <div className="mt-16">
            <Link
              to="/go"
              className="rounded-full bg-white px-8 py-4 font-bold text-indigo-600 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              タスク管理を始める
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
