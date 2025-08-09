"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaImage } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";

export default function AddBlog() {
  let [inputData, setInputData] = useState({
    title: "",
    description: "",
    category: "",
  });

  let [image, setImage] = useState(null);
  let [imagePreview, setImagePreview] = useState(null);
  let handleImage = (e) => {
    let file = e.target.files[0];
    if (!file) return;

    let exits = file.name.split(".").pop().toLowerCase();
    if (!["jpg", "jpeg", "png", "webp"].includes(exits)) {
      toast.error("Invalid file type");
      return;
    }

    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };
  let handleChange = (e) => {
    let { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        !image ||
        !inputData.title ||
        !inputData.description ||
        !inputData.category
      ) {
        toast.error("All fields are required");
      }

      let formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "dil_se_likha");
      formData.append("cloud_name", "dgllhyxgc");
      let cloudinaryRes = await fetch(
        "https://api.cloudinary.com/v1_1/dgllhyxgc/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      let data = await cloudinaryRes.json();
      if (!data?.secure_url) throw new Error("Image upload failed");
      let imgUrl = data.secure_url;

      let res = await axios.post("/api/blog/add", {
        ...inputData,
        image: imgUrl,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setInputData({
          title: "",
          description: "",
          category: "",
        });
        setImage(null);
        setImagePreview(null);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
        console.log(err.message)
      toast.error(err.message);
    }
  };
  return (
    <>
      <div className="h-screen w-[50%] flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center gap-6 font-bold w-full"
        >
          <div>
            <p className="">Blog Image</p>
            <label>
              {!imagePreview ? (
                <FaImage className="text-6xl" />
              ) : (
                <Image
                  src={imagePreview}
                  alt="blog img"
                  width={100}
                  height={100}
                  className="w-[150px] h-[70px]"
                />
              )}
              {/* <img
                src={imagePreview}
                alt="blog img"
                className="w-[100px] h-[70px] rounded"
              /> */}
              <input type="file" onChange={handleImage} hidden />
            </label>
          </div>
          <div>
            <label htmlFor="title">Blog Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={inputData.title}
              onChange={handleChange}
              placeholder="Enter Blog Title"
              className="w-full font-normal border border-muted rounded-md py-1.5 ps-2"
            />
          </div>
          <div>
            <label htmlFor="description">Blog Description</label>
            <input
              type="text"
              id="description"
              name="description"
              value={inputData.description}
              onChange={handleChange}
              placeholder="Enter Blog Description"
              className="w-full font-normal border border-muted rounded-md py-1.5 ps-2"
            />
          </div>
          <div>
            <label>Blog Category</label>
            <select
              id="category"
              name="category"
              value={inputData.category}
              onChange={handleChange}
              className="w-full font-normal border border-muted rounded-md py-1.5 ps-2"
            >
              <option>--Selection option--</option>
              <option value="Dil Se Baaten">Dil Se Baaten</option>
              <option value="Khayalon Ki Dunia">Khayalon Ki Dunia</option>
              <option value="Rozana Ki Diary">Rozana Ki Diary</option>
            </select>
          </div>
          <div>
            <button className="w-full border border-muted rounded-md py-1.5 ps-2 bg-primary hover:bg-secondary transition duration-500">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
