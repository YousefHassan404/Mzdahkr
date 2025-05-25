import express from "express";
import { User } from "../models/User.js";

//login
    
const authRouter = express.Router();

authRouter.post("/", async (req, res) => {
  const { email, password } = req.body;

  if (!email) return res.status(400).send("Username is required");
  if (!password) return res.status(400).send("Password is required");

  const user = await User.findOne({ email });
  if (!user) return res.status(404).send("User not found");

  const isMatch = await user.checkPassword(password);
  if (!isMatch) return res.status(400).send("Invalid password");

  return res.send(user.getAuthToken());
});

export default authRouter;