import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    unique: true,
    sparse: true,
  },
  password: {
    type: String,
    required: function () {
      return this.role === "customer";
    },
  },
  role: {
    type: String,
    enum: ["customer", "admin", "member"],
    default: "customer",
    required: true,
  },
  memberStatus: {
    type: String,
    enum: ["available", "assigned", "inactive"],
    default: undefined,
    required: function () {
      return this.role === "member";
    },
  },
});

const User = mongoose.model("User", userSchema);

export default User;
