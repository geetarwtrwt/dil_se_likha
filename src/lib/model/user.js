import { Schema, models, model } from "mongoose";
import bcrypt from "bcryptjs";

let userSchema = Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  isAdmin: { type: Boolean, default: false },
  password: { type: String, required: true },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  return (this.password = await bcrypt.hash(this.password, 10));
});

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

export let User = models.user || model("user", userSchema);
