import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/db/db";
import { Blog } from "../../../../lib/model/blog";
import { validateToken } from "../../../../lib/helper";

export let POST = async (request) => {
  try {
    await connectDB();
    let { userId } = await validateToken();

    let { image, title, description, content, category } = await request.json();

    if (!image || !title || !description || !content || !category) {
      return NextResponse.json({
        error: true,
        message: "All fields are required",
      });
    }

    let blog = await Blog.create({
      image,
      title,
      description,
      content,
      category,
      userId: userId,
    });
    return NextResponse.json({
      success: true,
      message: "Blog added successfully",
      data: blog,
    });
  } catch (err) {
    return NextResponse.json({ error: true, message: err.message });
  }
};
