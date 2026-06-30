import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRoute from "./routes/authRoute.js";
import quoteRoute from "./routes/quoteRoute.js";
import bookingRoute from "./routes/bookingRoute.js";
import adminRoute from "./routes/adminRoute.js";

export const createApp = ({ clientUrl = process.env.CLIENT_URL } = {}) => {
  const app = express();

  app.use(
    cors({
      origin: clientUrl,
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

  return app;
};
