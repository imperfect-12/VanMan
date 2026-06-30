import dotenv from "dotenv";
import mongoose from "mongoose";

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

const PORT = process.env.PORT || 3000;
const { createApp } = await import("./app.js");
const app = createApp();

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
