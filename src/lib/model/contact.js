import { Schema, models, model } from "mongoose";

let contactSchema = Schema(
  {
    name: { type: String, required: ture },
    email: { type: String, required: ture },
    message: { type: String, required: ture },
  },
  { timestamps: true }
);

export let Contact = models.contact || model("contact", contactSchema);
