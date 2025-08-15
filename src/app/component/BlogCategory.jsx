"use client";
import React, { useState } from "react";
import { UseAppContext } from "@/app/AuthContext";
import CategoryTabs from "@/app/component/CategoryTabs";
import BlogCard from "@/app/component/BlogCard";

function BlogCategory() {
  let { blogData } = UseAppContext();

  let [tabSelect, setTabSelect] = useState("all");
  let filterCategoryTab =
    tabSelect === "all"
      ? blogData
      : blogData.filter((cate) => tabSelect === cate.category);

  return (
    <>
      <section className="py-16 h-full">
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
