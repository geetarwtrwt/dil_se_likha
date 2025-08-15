import React from "react";
import { UseAppContext } from "@/app/AuthContext";
import Image from "next/image";

function BlogCard({ e }) {
  let { route } = UseAppContext();
  return (
    <div className="w-[90%] md:w-[25%] border border-primary rounded-md overflow-hidden">
      <div
        className="w-full cursor-pointer"
        onClick={() => route.push(`/blog_page/${e._id}`)}
      >
        <Image
          alt="blog img"
          src={e.image}
          width={100}
          height={100}
          className="w-full h-[300px] md:h-[180px]"
        />
      </div>
      <div className="p-4 flex flex-col gap-2">
        <p className="bg-primary w-fit text-sm p-1 font-semibold text-background rounded">
          {e.category}
        </p>
        <h3 className="font-bold">{e.title}</h3>
        <p className="text-sm">
          {e.description.split(" ").splice(0, 10).join(" ") + " ....."}
        </p>
        <button
          onClick={() => route.push(`/blog_page/${e._id}`)}
          className="cursor-pointer bg-primary hover:bg-secondary py-2 px-4 font-semibold rounded text-background"
        >
          Read More
        </button>
      </div>
    </div>
  );
}

export default BlogCard;
