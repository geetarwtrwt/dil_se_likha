import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db";
import { Blog } from "@/lib/model/blog";

export let POST = async (request) => {
  await connectDB();
  try {
    let { image, title, description, category } = await request.json();

    if (!image || !title || !description || !category) {
      return NextResponse.json({
        error: true,
        message: "All fields are required",
      });
    }

    let data = await Blog.create({ image, title, description, category });
    return NextResponse.json({
      success: true,
      message: "Blog added successfully",
      data,
    });
  } catch (err) {
    return NextResponse.json({ error: true, message: err.message });
  }
};
