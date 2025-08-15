import mongoose from "mongoose";

export let connectDB = async () => {
  try {
    console.log("Database connected successfully");
    return await mongoose.connect(process.env.MONGODB_URI);
  } catch (err) {
    console.log(err.message);
  }
};
