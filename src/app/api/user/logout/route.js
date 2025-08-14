import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db";
import { cookies } from "next/headers";

export let POST = async (request) => {
  try {
    await connectDB();

    cookies().set("token", "", {
      httpOnly: true,
      maxAge: new Date(0),
      path: "/",
    });
    return NextResponse.json({
      success: true,
      msg: "User logged out successfully",
    });
  } catch (err) {
    return NextResponse.json({ error: true, msg: err.message });
  }
};
