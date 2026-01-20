import express, { Router } from "express";
import isAdmin from "../middleware/adminCheck.js";
import auth from "../middleware/authMiddleware.js";
import {
  addMember,
  getMembers,
  deleteMember,
  updateStatus,
  assignMembers,
} from "../controllers/memberController.js";
import { getAllBookings } from "../controllers/bookingController.js";

const router = express.Router();

router.post("/members", auth, isAdmin, addMember);
router.get("/members", auth, isAdmin, getMembers);
router.delete("/members/:id", auth, isAdmin, deleteMember);
router.patch("/members/:id/status", auth, isAdmin, updateStatus);
router.patch("/bookings/:bookingid/assign", auth, isAdmin, assignMembers);
router.get("/bookings", auth, isAdmin, getAllBookings);

export default router;
