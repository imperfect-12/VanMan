import express from "express";
import User from "../models/user.js";
import { registerUser, loginUser } from "../controllers/authController.js";
import auth from "../middleware/authMiddleware.js";

export const router = express.Router();

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
});
router.post("/register", registerUser);
router.post("/login", loginUser);
