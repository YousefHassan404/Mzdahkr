import express from "express";
const userRouter = express.Router();
import { User } from "../models/User.js";

//register

userRouter.post("/", async (req, res) => {
  try {
    const {
      name,
      password,
      phone,
      email,
      role,
      NN,
      condition,
      status,
      priority,
      type,
      interstedLocation,
      budget,
      nextActions,
      createdBy,
      assignedTo,
    } = req.body;

    if (!role) {
      return res
        .status(400)
        .json({ message: "الرجاء تحديد الدور (role) بشكل صحيح." });
    }

    // التحقق من وجود مستخدم بنفس البريد أو الرقم القومي
    let existingUser = await User.findOne({ $or: [{ email }, { NN }] });
    if (existingUser)
      return res
        .status(400)
        .send("البريد الإلكتروني أو الرقم القومي مستخدم بالفعل");

    const newUser = new User({
      name,
      password,
      phone,
      email,
      role,
      NN,
      condition,
      status,
      priority,
      type,
      interstedLocation,
      budget,
      nextActions,
      createdBy,
      assignedTo: assignedTo || undefined,
    });

    await newUser.save();
    return res.status(201).send(newUser.getAuthToken());
  } catch (err) {
    console.error("خطأ أثناء إنشاء المستخدم:", err);
    return res.status(500).send("حدث خطأ في الخادم");
  }
});

userRouter.get("/", async (req, res) => {
  const users = await User.find();
  return res.send(users);
});

// userRouter.get("/seller", async (req, res) => {
//   const users = await User.find({role:"بائع"});
//   return res.send(users);
// });

userRouter.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).send("User not found");
  return res.send(user);
});


userRouter.put("/:id", async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      role,
      NN,
      condition,
      status,
      priority,
      type,
      interstedLocation,
      budget,
      nextActions,
      createdBy,
      assignedTo,
    } = req.body;

    const updateData = {
      name,
      phone,
      email,
      role,
      NN,
      condition,
      status,
      priority,
      type,
      interstedLocation,
      budget,
      nextActions,
      createdBy,
      assignedTo,
      updatedAt: Date.now(),
    };

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedUser) return res.status(404).send("User not found");
    return res.send(updatedUser);
  } catch (err) {
    console.error("Error updating user:", err);
    return res.status(500).send("Internal Server Error");
  }
});

userRouter.delete("/:id", async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).send("User not found");
  return res.send(user);
});

userRouter.put("/assign", async (req, res) => {
  const { userIds, sellerId } = req.body;

  if (!Array.isArray(userIds) || !sellerId)
    return res.status(400).send("بيانات غير مكتملة");

  try {
    await User.updateMany(
      { _id: { $in: userIds } },
      { $set: { assignedTo: sellerId } }
    );
    return res.send("تم التعيين بنجاح");
  } catch (err) {
    console.error("فشل التعيين:", err);
    return res.status(500).send("خطأ في الخادم");
  }
});

userRouter.get("/assigned-users/:id", async (req, res) => {
  const {id} = req.params;
  const users = await User.find({assignedTo:id});
  return res.send(users);
});

export default userRouter;
