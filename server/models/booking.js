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
    },
    loadSize: {
      type: String,
      required: true,
    },
    pickupLocation: {
      type: Object,
      required: true,
    },
    dropLocation: {
      type: Object,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
    memberAssigned: {
      type: Boolean,
      default: false,
    },
    BookingPrice: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
