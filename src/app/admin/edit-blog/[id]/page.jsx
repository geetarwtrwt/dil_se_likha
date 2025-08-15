"use client";
import React, { useEffect } from "react";
import Add_Blog from "@/app/component/Add_Blog";
import { useParams } from "next/navigation";
import { UseAppContext } from "@/app/AuthContext";

export default function Page() {
  let params = useParams();
  let {
    blogData,
    blogInputData,
    setBlogInputData,
    blogImage,
    blogImagePreview,
    setBlogImagePreview,
    axios,
    toast,
    route,
  } = UseAppContext();

  useEffect(() => {
    if (params.id && blogData.length > 0) {
      let editBlog = blogData.find((e) => {
        return e._id === params.id;
      });
      if (editBlog) {
        setBlogInputData({
          title: editBlog.title,
          description: editBlog.description,
          content: editBlog.content,
          category: editBlog.category,
        });
        setBlogImagePreview(editBlog.image);
      }
    }
  }, [params.id, blogData]);
  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        !blogImagePreview ||
        !blogInputData.title ||
        !blogInputData.description ||
        !blogInputData.content ||
        !blogInputData.category
      ) {
        toast.error("All fields are required");
        return;
      }

      let imgUrl = blogImagePreview;
      if (blogImage) {
        let formData = new FormData();
        formData.append("file", blogImage);
        formData.append("upload_preset", "dil_se_likha");
        formData.append("cloud_name", "dgllhyxgc");

        let cloudinaryRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dgllhyxgc/image/upload",
          formData
        );

        imgUrl = cloudinaryRes?.data.secure_url;
        if (!imgUrl) throw new Error("Image upload failed");
      }
      let res = await axios.patch(`/api/blog/update/${params.id}`, {
        ...blogInputData,
        image: imgUrl,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        route.push("/admin/blog-list");
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    }
  };
  return (
    <section>
      <Add_Blog handleSubmit={handleSubmit} />
    </section>
  );
}
