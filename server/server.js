import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

import authRoute from "./routes/authRoute.js";
import quoteRoute from "./routes/quoteRoute.js";
import bookingRoute from "./routes/bookingRoute.js";
import adminRoute from "./routes/adminRoute.js";
import mongoose from "mongoose";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/quotes", quoteRoute);
app.use("/api/bookings", bookingRoute);
app.use("/api/admin", adminRoute);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("connected to the database"))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => [console.log(`server running on port ${PORT}`)]);
