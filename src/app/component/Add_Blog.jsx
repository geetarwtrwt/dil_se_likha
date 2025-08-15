"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaImage } from "react-icons/fa";
import { UseAppContext } from "@/app/AuthContext";

export default function Add_Blog({ handleSubmit }) {
  let {
    blogInputData,
    blogImagePreview,
    handleBlogImage,
    handleBlogChange,
    editBlog,
  } = UseAppContext();

  return (
    <div className="py-16 pt-28 w-full md:w-[50%] flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center gap-6 font-bold w-full"
      >
        <div>
          <p className="">Blog Image</p>
          <label className="cursor-pointer">
            {!blogImagePreview ? (
              <FaImage className="text-6xl" />
            ) : (
              <Image
                src={blogImagePreview}
                alt="blog img"
                width={100}
                height={100}
                className="w-[150px] h-[70px]"
              />
            )}
            <input type="file" onChange={handleBlogImage} hidden />
          </label>
        </div>
        <div>
          <label htmlFor="title">Blog Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={blogInputData.title}
            onChange={handleBlogChange}
            placeholder="Enter Blog Title"
            className="w-full font-normal border border-muted rounded-md py-1.5 ps-2"
          />
        </div>
        <div>
          <label htmlFor="title">Blog Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={blogInputData.description}
            onChange={handleBlogChange}
            placeholder="Enter Blog Title"
            className="w-full font-normal border border-muted rounded-md py-1.5 ps-2"
          />
        </div>
        <div>
          <label htmlFor="description">Blog Content</label>
          <textarea
            rows={5}
            id="content"
            name="content"
            value={blogInputData.content}
            onChange={handleBlogChange}
            placeholder="Enter Blog Content"
            className="w-full font-normal border border-muted rounded-md py-1.5 ps-2"
          ></textarea>
        </div>
        <div>
          <label>Blog Category</label>
          <select
            id="category"
            name="category"
            value={blogInputData.category}
            onChange={handleBlogChange}
            className="w-full font-normal border border-muted rounded-md py-1.5 ps-2"
          >
            <option>--Selection option--</option>
            <option value="Dil Se Baaten">Dil Se Baaten</option>
            <option value="Khayalon Ki Dunia">Khayalon Ki Dunia</option>
            <option value="Rozana Ki Diary">Rozana Ki Diary</option>
          </select>
        </div>
        <div>
          <button className="cursor-pointer w-full border border-muted rounded-md py-1.5 ps-2 bg-primary hover:bg-secondary transition duration-500">
            {editBlog ? "Update" : "Create"} Blog
          </button>
        </div>
      </form>
    </div>
  );
}
