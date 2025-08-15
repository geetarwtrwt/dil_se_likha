"use client";
import React, { useState } from "react";
import Add_Blog from "@/app/component/Add_Blog";
import { UseAppContext } from "@/app/AuthContext";

export default function Page() {
  let {
    toast,
    axios,
    blogInputData,
    setBlogInputData,
    blogImage,
    setBlogImage,
    setBlogImagePreview,
  } = UseAppContext();

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        !blogImage ||
        !blogInputData.title ||
        !blogInputData.description ||
        !blogInputData.content ||
        !blogInputData.category
      ) {
        toast.error("All fields are required");
      }

      let formData = new FormData();
      formData.append("file", blogImage);
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
        ...blogInputData,
        image: imgUrl,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        setBlogInputData({
          title: "",
          description: "",
          content: "",
          category: "",
        });
        setBlogImage(null);
        setBlogImagePreview(null);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    }
  };
  return (
    <>
      <section>
        <Add_Blog handleSubmit={handleSubmit} />
      </section>
    </>
  );
}
