import Button from "./Button";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          username: formData.username,
          password: formData.password,
        },
        { withCredentials: true }
      );

      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login successful!");
      navigate("/");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Login failed: " + (err.response?.data?.message || err.message));
    }
  };
  const navigate = useNavigate();
  return (
    <div className="left w-1/2 h-full rounded-l-2xl overflow-hidden ">
      <div className="flex flex-col justify-center items-center z-0 h-full w-full  p-10 ">
        <p className="text-zinc-100 text-3xl">Howdy! </p>
        <p className="text-zinc-400 pb-10 pt-2">
          Log into your <span className=" text-sky-500">ReadRipple</span>{" "}
          Account
        </p>

        <form className="w-full h-full p-5" onSubmit={handleSubmit}>
          <div className="username flex flex-col gap-3">
            <label htmlFor="username" className="w-full">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              className="w-full border-1 border-zinc-400/20 h-10 p-3 rounded-md"
              value={formData.username}
              onChange={handleChange}
            />

            <label htmlFor="password" className="w-full">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="w-full border-1 border-zinc-400/20 h-10 p-3 rounded-md"
              value={formData.password}
              onChange={handleChange}
            />
            <Button text={"Log In"} />
            <div>
              <div className="flex flex-col text-sm w-full items-center justify-end mt-10 gap-5">
                <span
                  className="hover:cursor-pointer hover:underline"
                  onClick={() => navigate("/forgot")}
                >
                  Forgot your password?
                </span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
