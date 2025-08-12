import mongoose, { Schema, model, models } from "mongoose";

const blogSchema = Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["Dil Se Baaten", "Khayalon Ki Dunia", "Rozana Ki Diary"],
      required: true,
    },
  },
  { timestamps: true }
);

export const Blog = models.Blog || model("Blog", blogSchema);
