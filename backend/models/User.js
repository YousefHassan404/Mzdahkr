import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, min: 3, max: 25 },
  password: { type: String, required: true, min: 8, max: 300 },
  phone: { type: String, required: true, min: 10, max: 15 },
  email: { type: String, required: true, min: 6, max: 50 },
  NN:{type:String,required:true},
  role: { type: String, required: true, enum: ["admin", "user"] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.getAuthToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      phone: this.phone,
      role: this.role,
      password: this.password,
    },
    process.env.JWT_SECRET
  );
};

userSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", userSchema);
