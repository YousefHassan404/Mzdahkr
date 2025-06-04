import express from "express";
const userRouter = express.Router();
import { User } from "../models/User.js";


//register

userRouter.post("/", async (req, res) => {
  const { name , password , phone ,email ,role ,NN} =  req.body;
  let user = await User.findOne({ email });
  if (user) return res.status(400).send("email is already taken");

  user = new User({ name, password ,phone ,email ,role,NN});
  await user.save();
  return res.send(user.getAuthToken());
});

userRouter.get("/", async (req, res) => {
  const users = await User.find({});
  return res.send(users);
});



export default userRouter;
