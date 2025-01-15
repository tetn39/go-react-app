import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-purple-100 py-16">
      <div className="container mx-auto px-4">
        <h1 className="mb-12 text-center text-5xl font-bold text-indigo-600">
          About Us
        </h1>

        <div className="mx-auto max-w-3xl space-y-8 text-center">
          <p className="text-xl leading-relaxed text-gray-700">
            私たちは、最新のテクノロジーを活用して、より良い未来を創造することを目指しています。
            シンプルで使いやすい製品を通じて、人々の生活をより豊かにすることが私たちのミッションです。
          </p>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-xl bg-white p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <h2 className="mb-4 text-xl font-bold text-indigo-600">
                ビジョン
              </h2>
              <p className="text-gray-600">
                テクノロジーの力で世界をより良く変えていきます
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <h2 className="mb-4 text-xl font-bold text-indigo-600">
                ミッション
              </h2>
              <p className="text-gray-600">
                革新的なソリューションで社会に貢献します
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <h2 className="mb-4 text-xl font-bold text-indigo-600">
                バリュー
              </h2>
              <p className="text-gray-600">誠実さと創造性を大切にします</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
