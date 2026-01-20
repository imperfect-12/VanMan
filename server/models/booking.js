import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    serviceType: {
      type: String,
      required: true,
      enum: ["small-parcel", "furniture", "house-move", "helper-only"],
    },
    serviceDate: {
      type: Date,
      required: true,
    },
    loadSize: {
      type: String,
      required: true,
      emum: ["small", "medium", "large"],
    },
    pickupLocation: {
      type: Object,
      required: true,
    },
    dropLocation: {
      type: Object,
      required: true,
    },
    contactDetails: {
      type: Object,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
    memberAssigned: {
      type: Boolean,
      default: false,
    },
    bookingPrice: {
      type: Number,
      default: 0,
    },
    assignedMember: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
