"use client";
import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { UseAppContext } from "../AuthContext";

function Page() {
  let { toast, axios, route, fetchUserData } = UseAppContext();
  let [state, setState] = React.useState("login");

  let [inputData, setInputData] = useState({
    name: "",
    email: "",
    password: "",
  });

  let handleChange = (e) => {
    let { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
    console.log(name, value);
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (state === "login") {
        let res = await axios.post("/api/user/login", inputData);
        console.log(res);
        if (res.data.success) {
          route.push("/admin/add-blog");
          fetchUserData();
          toast.success(res.data.msg);
          setInputData({
            email: "",
            password: "",
          });
        } else {
          toast.error(res.data.msg);
        }
      } else {
        let res = await axios.post("/api/user/signup", inputData);
        console.log(res);
        if (res.data.success) {
          setState("login");
          toast.success(res.data.msg);
          setInputData({
            name: "",
            email: "",
            password: "",
          });
        } else {
          toast.error(res.data.msg);
        }
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  return (
    <div className="py-10 pt-28">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white"
      >
        <p className="text-2xl font-semibold m-auto text-primary">
          {state === "login" ? "Login" : "Sign Up"}
        </p>
        {state === "register" && (
          <div className="flex items-center w-full  bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <FaUser />
            <input
              type="text"
              onChange={handleChange}
              name="name"
              value={inputData.name}
              placeholder="User Name"
              className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full"
              required
            />
          </div>
        )}
        <div className="flex items-center w-full  bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <FaEnvelope />
          <input
            type="email"
            onChange={handleChange}
            value={inputData.email}
            name="email"
            placeholder="Email id"
            className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full"
            required
          />
        </div>
        <div className="flex items-center w-full  bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <FaLock />
          <input
            type="password"
            onChange={handleChange}
            name="password"
            value={inputData.password}
            placeholder="Password"
            className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full"
            required
          />
        </div>
        {state === "register" ? (
          <p>
            Already have account?
            <span
              onClick={() => setState("login")}
              className="underline cursor-pointer"
            >
              click here
            </span>
          </p>
        ) : (
          <p>
            Create an account?
            <span
              onClick={() => setState("register")}
              className="underline cursor-pointer"
            >
              click here
            </span>
          </p>
        )}
        <button className="bg-primary hover:bg-secondary transition-all font-semibold text-white w-full py-2 rounded-md cursor-pointer">
          {state === "register" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Page;
