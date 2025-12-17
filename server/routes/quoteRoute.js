import express from "express";
import { createQuote, getQuotes } from "../controllers/quoteController.js";

const router = express.Router();

router.post("/", createQuote);
router.get("/my", getQuotes);

module.exports = router;
