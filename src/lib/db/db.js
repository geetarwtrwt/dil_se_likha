import mongoose from "mongoose";

export let connectDB = async () => {
  try {
    await mongoose.connect(process.env.CONNECT_URL);
    console.log("Database connected successfully");
  } catch (err) {
    console.log(err.message);
  }
};
