import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db";
import { Contact } from "@/lib/model/contact";

export let POST = async (request) => {
  try {
    await connectDB();
    let { name, email, message } = await request.json();
    if (!name || !email || !message) {
      return NextResponse.json({
        error: true,
        message: "All fields are required",
      });
    }
    let contactData = await Contact.create({ name, email, message });
    return NextResponse.json({
      success: true,
      message: "Message sent successfully",
      data: contactData,
    });
  } catch (err) {
    return NextResponse.json({ error: true, message: err.message });
  }
};
