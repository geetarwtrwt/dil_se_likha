"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { UseAppContext } from "@/app/AuthContext";
import Image from "next/image";

export default function Page() {
  let { blogData } = UseAppContext();
  let params = useParams();
  let [data, setData] = useState(null);

  useEffect(() => {
    if (blogData.length > 0 && params.id) {
      let findBlogData = blogData.find((e) => e._id === params.id);
      setData(findBlogData || null);
    }
  }, [blogData, params.id]);
  console.log(data);
  return (
    <section className="py-16 pt-28 h-full">
      <div className="containerBox flex items-center justify-center">
        {data ? (
          <div className="flex flex-col gap-6 w-[80%]">
            <h2 className="text-center text-2xl md:text-6xl font-bold text-primary drop-shadow-lg">
              {data.title}
            </h2>
            <Image
              alt="blog img"
              src={data.image}
              width={400}
              height={400}
              className="w-full h-[450px]"
            />
            <div>
              <h4 className="text-xl md:text-2xl font-bold text-primary border-b border-gray-300 pb-2 mb-4">
                Overview
              </h4>
              <p className="text-lg">{data.description}</p>
            </div>
            <div>
              <h4 className="text-xl md:text-2xl font-bold text-primary border-b border-gray-300 pb-2 mb-4">
                Full Article
              </h4>
              <p className="text-lg">{data.content}</p>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </section>
  );
}
