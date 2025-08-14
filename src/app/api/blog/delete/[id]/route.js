import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db";
import { User } from "@/lib/model/user";
import { Blog } from "@/lib/model/blog";
import { validateToken } from "@/lib/helper";

export let DELETE = async (request, { params }) => {
  try {
    await connectDB();

    let { userId } = await validateToken();
    let deleteId = params.id;

    let user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({
        error: true,
        message: "Unauthorize action",
      });
    }

    await Blog.findByIdAndDelete(deleteId);
    return NextResponse.json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (err) {
    return NextResponse.json({ error: true, message: err.message });
  }
};
