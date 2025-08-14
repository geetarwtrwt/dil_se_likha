"use client";
import React, { useEffect } from "react";
import { UseAppContext } from "@/app/AuthContext";
import Image from "next/image";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

export default function Page() {
  let { blogData, fetchBlogData, axios, toast } = UseAppContext();

  let handleDelete = async (id) => {
    try {
      let res = await axios.delete(`/api/blog/delete/${id}`);
      console.log(res);
      if (res.data.success) {
        await fetchBlogData();
        toast.success(res.data.message);
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    }
  };
  useEffect(() => {
    fetchBlogData();
  }, []);

  return (
    <section className="">
      <table className="w-full">
        <thead>
          <th className="py-4">Blog</th>
          <th>Category</th>
          <th>Date</th>
          <th>Action</th>
        </thead>
        <tbody className="">
          {blogData.map((e) => {
            return (
              <tr
                key={e._id}
                className="h-full text-center border border-gray-200"
              >
                <td className="text-left px-4 py-2 flex items-center gap-4">
                  <Image
                    src={e.image}
                    priority
                    alt="blog img"
                    width={50}
                    height={50}
                    className="w-[60px] h-[60px] rounded-full"
                  />
                  <p>{e.title}</p>
                </td>
                <td>
                  <p>{e.category}</p>
                </td>
                <td>{new Date(e.createdAt).toLocaleDateString()}</td>
                <td>
                  <div className="text-2xl flex justify-center items-center gap-4 h-full">
                    <FaEdit className="cursor-pointer text-primary hover:text-secondary transition duration-500" />
                    <MdDelete
                      onClick={() => handleDelete(e._id)}
                      className="cursor-pointer text-primary hover:text-secondary transition duration-500"
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
