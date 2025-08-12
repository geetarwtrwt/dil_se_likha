import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db";
import { User } from "@/lib/model/user";

export let POST = async (request) => {
  try {
    await connectDB();
    let { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: true, msg: "All fields are required" });
    }

    let exits = await User.findOne({ email });
    if (exits) {
      return NextResponse.json({ error: true, msg: "User already exists" });
    }

    let data = await User.create({ name, email, password, isAdmin: false });

    return NextResponse.json({ success: true, msg: "Signup done", data });
  } catch (err) {
    return NextResponse.json({ error: true, msg: err.message });
  }
};
