import express from "express";
import auth from "../middleware/authMiddleware.js";
import { createQuote } from "../controllers/quoteController.js";

const router = express.Router();

router.post("/", auth, createQuote);

export default router;
