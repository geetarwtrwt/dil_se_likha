import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db";
import { Blog } from "@/lib/model/blog";

export let GET = async (request) => {
  await connectDB();
  try {
    let blog = await Blog.find().sort({ createdAt: -1 });
    return NextResponse.json({
      success: true,
      msg: blog,
    });
  } catch (err) {
    return NextResponse.json({ error: true, message: err.message });
  }
};
