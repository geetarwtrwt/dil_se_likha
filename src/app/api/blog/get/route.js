import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db";
import { Blog } from "@/lib/model/blog";
import { validateToken } from "@/lib/helper";

export let GET = async (request) => {
  await connectDB();
  try {
    let { userId } = await validateToken();

    let blog = await Blog.findById(userId).sort({ createAt: -1 });

    return NextResponse.json({
      success: true,
      message: "Blog data ",
      data: blog,
    });
  } catch (err) {
    return NextResponse.json({ error: true, message: err.message });
  }
};
