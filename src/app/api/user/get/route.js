import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db";
import { User } from "@/lib/model/user";
import { validateToken } from "@/lib/helper";

export let GET = async (request) => {
  try {
    await connectDB();
    let { userId } = await validateToken();

    let data = await User.findById(userId).select("-password");
    if (!data) {
      return NextResponse.json({ error: true, msg: "User not found" });
    }

    return NextResponse.json({ success: true, msg: data });
  } catch (err) {
    return NextResponse.json({ error: true, msg: err.message });
  }
};
