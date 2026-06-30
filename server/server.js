import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const requiredEnv = ["MONGODB_URI", "JWT_SECRET", "CLIENT_URL"];

for (const key of requiredEnv) {
  if (!process.env[key]) {
    console.error(`Missing required environment variable: ${key}`);
    process.exit(1);
  }
}

import authRoute from "./routes/authRoute.js";
import quoteRoute from "./routes/quoteRoute.js";
import bookingRoute from "./routes/bookingRoute.js";
import adminRoute from "./routes/adminRoute.js";
import mongoose from "mongoose";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json());
app.use(cookieParser());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("/ready", (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ status: "not_ready" });
  }

  res.status(200).json({ status: "ready" });
});

app.use("/api/auth", authRoute);
app.use("/api/quotes", quoteRoute);
app.use("/api/bookings", bookingRoute);
app.use("/api/admin", adminRoute);

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to the database");
    app.listen(PORT, () => console.log(`server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
