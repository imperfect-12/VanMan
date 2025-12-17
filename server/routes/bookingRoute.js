import express from "express";
import {
  createBooking,
  getBookings,
} from "../controllers/bookingController.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", auth, createBooking);
router.post("/my", auth, getBookings);

module.exports = router;
