import express from "express";
import {
  registerUser,
  loginUser,
  getMe,
  logout,
} from "../controllers/authController.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/me", auth, getMe);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", auth, logout);

export default router;
