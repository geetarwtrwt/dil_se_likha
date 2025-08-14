import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db";
import { User } from "@/lib/model/user";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export let POST = async (request) => {
  try {
    await connectDB();
    let { email, password } = await request.json();

    let exits = await User.findOne({ email });
    if (!exits || !(await exits.comparePassword(password))) {
      return NextResponse.json({ error: true, msg: "Invalid credentials" });
    }

    let token = jwt.sign({ id: exits._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    let response = NextResponse.json({
      success: true,
      msg: "Logged in sucessfully",
      data: exits,
    });

    (await cookies()).set("token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 24 * 60 * 60,
    });
    return response;
  } catch (err) {
    return NextResponse.json({ error: true, msg: err.message });
  }
};
