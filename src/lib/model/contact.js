import { Schema, models, model } from "mongoose";

let contactSchema = Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export let Contact = models.contact || model("contact", contactSchema);
