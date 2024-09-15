import axios from "axios";
import React, { useState } from "react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/signup", {
        Email: email,
        Password: password,
      });
      if (response.status === 200) {
        console.log("Signup successful");
      } else {
        console.log("Signup failed");
      }
    } catch (error) {
      console.error("There was an error signing up!", error);
    }
  }
  return (
    <div>
      <h1 className="m-auto size-20 text-center">Signup</h1>
      <form onSubmit={handleSubmit} className="m-auto w-52 bg-yellow-200 p-2">
        <span>Email</span>
        <input
          type="email"
          className="border border-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <span>Password</span>
        <input
          type="password"
          className="border border-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" className="border border-blue-500" />
      </form>
    </div>
  );
};

export default Signup;
