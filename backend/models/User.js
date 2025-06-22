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
  NN: { type: String, required: true, unique: true, min: 14, max: 14 },
  role: { type: String, default: "مستخدم", enum: ["مدير","مدير الإدارة","تيم ليدر ماركتنج","تيم ليدر سيلز","عضو ماركتنج","عضو سيلز" , "مستخدم"] },
  condition: {
    type: String,
    default: "جديد",
    enum: ["جديد", "تم الاتصال", "مهتم", "غير مهتم", "مغلق"]
  },
  
  status: {
    type: String,
    default: "غير معروف",
    enum: ["استثمار", "شراء", "ايجار","غير معروف"],
  },
  priority: {
    type: String,
    default: "غير معروف",
    enum: ["عالي", "متوسط", "منخفض", "غير معروف"],
  },
  type: {
    type: String,
    default: "محتمل",
    enum: ["محتمل", "غير مهتم", "حالي"],
  },
  interstedLocation: {
    type: String,
    default: "غير معروف",
  },  
  budget: { type: Number, default: 0 },

  nextActions: [
    {
      type: {
        type: String,
        enum: ["مكالمة", "بريد إلكتروني", "اجتماع", "متابعة"],
      },
      note: String,
      dueDate: Date,
    }
  ],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
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
      NN:this.NN,
      createdAt:this.createdAt,
      password: this.password,
    },
    process.env.JWT_SECRET
  );
};

userSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", userSchema);
