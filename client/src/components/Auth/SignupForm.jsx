import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
const API = import.meta.env.VITE_API_BASE_URL;

import Button from "./Button";
export default function SignupForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    repassword: "",
  });
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.repassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(
        `${API}/api/users/register`,
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        },
        { withCredentials: true }
      );

      console.log("User registered:", res.data);
      toast.success("Registered Succesfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/");
      window.location.reload();
    } catch (err) {
      console.error("Registration failed", err.response?.data || err.message);

      toast.error(err.response?.data?.message || err.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };
  return (
    <div className="right md:w-1/2 h-full rounded-l-2xl overflow-hidden ">
      <div className="flex flex-col justify-center items-center z-0 h-full w-full p-10 ">
        <p className="text-zinc-100 text-3xl font-bold">
          Join
          <span className=" text-sky-500"> ReadRipple</span>
        </p>
        <p className="block text-center text-zinc-400 pb-10 pt-2">
          Create your account to start exploring and sharing book reviews
        </p>

        <form
          onSubmit={handleSubmit}
          className=" w-full h-full p-5 pt-1"
          action=""
        >
          <div className="username flex flex-col gap-3">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              className="w-full border-1 border-zinc-400/20 h-10 p-3 rounded-md"
              value={formData.username}
              onChange={handleChange}
            />

            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              className="w-full border-1 border-zinc-400/20 h-10 p-3 rounded-md"
              value={formData.email}
              onChange={handleChange}
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="w-full border-1 border-zinc-400/20 h-10 p-3 rounded-md"
              value={formData.password}
              onChange={handleChange}
            />

            <label htmlFor="repassword">Re-type Password</label>
            <input
              type="password"
              id="repassword"
              placeholder="Re-type Password"
              className="w-full border-1 border-zinc-400/20 h-10 p-3 rounded-md"
              value={formData.repassword}
              onChange={handleChange}
            />
            <Button text={"Sign Up"} />
            <div>
              <div className="flex flex-col  text-sm w-full items-center justify-end mt-10 gap-5 "></div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
