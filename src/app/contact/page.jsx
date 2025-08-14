"use client";
import React, { useState } from "react";
import { FaUser, FaEnvelope } from "react-icons/fa";

export default function Page() {
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
  return (
    <form className="py-16 pt-28 flex flex-col items-center text-sm">
      <p className="text-xs bg-primary text-background font-medium px-3 py-1 rounded-full">
        Contact Us
      </p>
      <h2 className="text-2xl md:text-4xl font-bold py-4 text-center">
        Let’s Get In Touch.
      </h2>
      <p className="max-md:text-sm pb-10 text-center">
        Or just reach out manually to us at
        <a href="mailto:example@example.com" className="ms-2 underline">
          example@example.com
        </a>
      </p>

      <div className="max-w-96 w-full px-4 flex flex-col gap-4">
        <div className="flex items-center w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <FaUser />
          <input
            type="text"
            onChange={handleChange}
            name="name"
            required
            value={inputData.name}
            placeholder="User Name"
            className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full"
          />
        </div>

        <div className="flex items-center w-full  bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <FaEnvelope />
          <input
            type="email"
            onChange={handleChange}
            value={inputData.email}
            required
            name="email"
            placeholder="Email id"
            className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full"
          />
        </div>

        <div className=" w-full bg-white border border-gray-300/80 rounded-2xl pl-6 pt-4">
          <textarea
            onChange={handleChange}
            value={inputData.message}
            name="message"
            rows="4"
            className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full"
            placeholder="Enter your message"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-primary hover:bg-secondary transition-all font-semibold text-white w-full py-2 rounded-md cursor-pointer"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
