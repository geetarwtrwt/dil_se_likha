import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db";
import { Blog } from "@/lib/model/blog";
import { User } from "@/lib/model/user";
import { validateToken } from "@/lib/helper";

export let PATCH = async (request, { params }) => {
  try {
    await connectDB();
    let { userId } = await validateToken();

    let user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: true, message: "Unauthorized" });
    }

    let body = await request.json();
    let id = params.id;

    let blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({
        error: true,
        message: "Blog not found",
      });
    }

    await Blog.findByIdAndUpdate(id, body);
    return NextResponse.json({
      success: true,
      message: "Blog updated successfully",
    });
  } catch (err) {
    return NextResponse.json({ error: true, message: err.message });
  }
};
