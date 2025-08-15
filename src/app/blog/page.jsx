"use client";
import React, { useState } from "react";
import { UseAppContext } from "@/app/AuthContext";
import CategoryTabs from "@/app/component/CategoryTabs";
import BlogCard from "@/app/component/BlogCard";

export default function Page() {
  let { blogData, inputSearchData } = UseAppContext();

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
          <CategoryTabs tabSelect={tabSelect} setTabSelect={setTabSelect} />
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-14 md:gap-8">
            {filterCategoryTab.length > 0 ? (
              filterCategoryTab.map((e) => {
                return <BlogCard e={e} key={e._id} />;
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
