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

export default function Page() {
  let { blogData, route, inputSearchData } = UseAppContext();
  // console.log(inputSearchData);
  let [tabSelect, setTabSelect] = useState("all");
  let filterCategoryTab = blogData
    .filter((cate) => tabSelect === "all" || tabSelect === cate.tab)
    .filter((e) =>
      inputSearchData === ""
        ? true
        : e.title.toLowerCase().includes(inputSearchData.toLowerCase()) ||
          e.category.toLowerCase().includes(inputSearchData.toLowerCase()) ||
          e.description.toLowerCase().includes(inputSearchData.toLowerCase())
    );

  return (
    <>
      <section className="py-16 pt-28 h-full">
        <div className="containerBox flex flex-col gap-16">
          <div className="flex justify-evenly flex-col md:flex-row gap-2">
            {categoryTab.map((e, index) => {
              return (
                <button
                  onClick={() => setTabSelect(e.tab)}
                  key={index}
                  className={`${
                    tabSelect === e.tab
                      ? "bg-primary text-background"
                      : "text-foreground"
                  }  transition duration-500 border-2 border-primary px-2 md:px-8 py-2 rounded-md font-semibold `}
                >
                  {e.name}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap justify-center md:justify-between items-center gap-8">
            {filterCategoryTab.length > 0 ? (
              filterCategoryTab.map((e, index) => {
                return (
                  <div
                    key={index}
                    className="w-[90%] md:w-[25%] border border-primary rounded-md overflow-hidden"
                  >
                    <div
                      className="w-full cursor-pointer"
                      onClick={() => route.push(`/blog_page/${e._id}`)}
                    >
                      <Image
                        alt="blog img"
                        src={e.image}
                        priority
                        width={100}
                        height={100}
                        className="w-full h-[250px] md:h-[180px]"
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
              })
            ) : (
              <div className="w-full text-2xl">
                <p className="text-center font-bold ">No Data Found</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
