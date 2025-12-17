import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRoute from "./routes/authRoute.js";
import quoteRoute from "./routes/quoteRoute.js";
import bookingRoute from "./routes/bookingRoute.js";

const app = express();

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

app.use("/api/auth", authRoute);
app.use("/api/quotes", quoteRoute);
app.use("/api/bookings", bookingRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => [console.log(`server running on port${PORT}`)]);
