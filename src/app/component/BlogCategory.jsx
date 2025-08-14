"use client";
import React, { useState } from "react";
import Image from "next/image";
import { UseAppContext } from "@/app/AuthContext";

let categoryTab = [
  { name: "All", tab: "all" },
  { name: "Dil Se Baaten", tab: "dilSeBaaten" },
  { name: "Khayalon Ki Dunia", tab: "khayalonKiDunia" },
  { name: "Rozana Ki Diary", tab: "rozanaKiDiary" },
];

function BlogCategory() {
  let { blogData, route } = UseAppContext();

  let [tabSelect, setTabSelect] = useState("all");
  let filterCategoryTab =
    tabSelect === "all"
      ? blogData
      : blogData.filter((cate) => tabSelect === cate.tab);

  return (
    <>
      <section className="py-16 h-full">
        <div className="containerBox flex flex-col gap-16">
          <div className="flex justify-evenly">
            {categoryTab.map((e, index) => {
              return (
                <button
                  onClick={() => setTabSelect(e.tab)}
                  key={index}
                  className={`${
                    tabSelect === e.tab
                      ? "bg-primary text-background"
                      : "text-foreground"
                  }  transition duration-500 border-2 border-primary px-8 py-2 rounded-md font-semibold `}
                >
                  {e.name}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap justify-between gap-8">
            {filterCategoryTab.slice(0, 3).map((e, index) => {
              return (
                <div
                  key={index}
                  className="w-[25%] border border-primary rounded-md overflow-hidden"
                >
                  <div
                    className="w-full cursor-pointer"
                    onClick={() => route.push(`/blog_page/${e._id}`)}
                  >
                    <Image
                      alt="blog img"
                      src={e.image}
                      width={100}
                      height={100}
                      className="w-full h-[180px]"
                    />
                  </div>
                  <div className="p-4 flex flex-col gap-2">
                    <p className="bg-primary w-fit text-sm p-1 font-semibold text-background rounded">
                      {e.category}
                    </p>
                    <h3 className="font-semibold">{e.heading}</h3>
                    <p className="text-sm">
                      {e.description.split(" ").splice(0, 10).join(" ") +
                        " ....."}
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
            })}
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => route.push(`/blog`)}
              className="cursor-pointer bg-primary hover:bg-secondary py-2 px-4 font-semibold rounded text-background"
            >
              Explore More
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default BlogCategory;
