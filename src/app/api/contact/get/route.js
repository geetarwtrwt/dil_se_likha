import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db";
import { Contact } from "@/lib/model/contact";

export let GET = async (request) => {
  try {
    await connectDB();
    let contactData = await Contact.find({});
    return NextResponse.json({
      success: true,
      message: "Message data",
      data: contactData,
    });
  } catch (err) {
    return NextResponse.json({ error: true, message: err.message });
  }
};
