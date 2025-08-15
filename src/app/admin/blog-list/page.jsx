"use client";
import React, { useEffect } from "react";
import { UseAppContext } from "@/app/AuthContext";
import Image from "next/image";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

export default function Page() {
  const { blogData, fetchBlogData, axios, toast, route } = UseAppContext();

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`/api/blog/delete/${id}`);
      if (res.data.success) {
        await fetchBlogData();
        toast.success(res.data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchBlogData();
  }, []);

  return (
    <section className="w-full py-16 pt-28 px-4">
      {blogData.length > 0 ? (
        <>
          <div className="hidden md:flex py-2 font-bold text-xl border-b border-gray-200">
            <h4 className="w-[45%]">Blog</h4>
            <h4 className="w-[20%]">Category</h4>
            <h4 className="w-[15%]">Date</h4>
            <h4 className="w-[15%]">Action</h4>
          </div>

          <div className="flex flex-col gap-4 py-4">
            {blogData.map((e) => (
              <div
                key={e._id}
                className="flex flex-col gap-4 md:gap-0 md:flex-row md:items-center border-b border-gray-200 py-4 md:py-2"
              >
                <div className="flex items-center gap-4 w-full md:w-[45%] max-xs:flex-col max-xs:items-start">
                  <Image
                    src={e.image}
                    priority
                    alt="blog img"
                    width={60}
                    height={60}
                    className="w-[60px] h-[60px] rounded-full object-cover"
                  />
                  <p className="font-medium">{e.title}</p>
                </div>

                <p className="w-full md:w-[20%]">{e.category}</p>

                <p className="w-full md:w-[15%]">
                  {new Date(e.createdAt).toLocaleDateString()}
                </p>

                <div className="w-full md:w-[15%] flex gap-4 text-2xl text-primary">
                  <FaEdit
                    onClick={() => route.push(`/admin/edit-blog/${e._id}`)}
                    className="cursor-pointer hover:text-secondary transition"
                  />
                  <MdDelete
                    onClick={() => handleDelete(e._id)}
                    className="cursor-pointer hover:text-secondary transition"
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="w-full text-2xl">
          <p className="text-center font-bold">No Data Found</p>
        </div>
      )}
    </section>
  );
}
