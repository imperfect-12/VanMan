import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema({
  serviceType: {
    type: String,
    required: true,
    enum: ["small-parcel", "furniture", "house-move", "helper-only"],
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
  distance: {
    type: Number,
    required: true,
  },
});

const Quote = mongoose.model("Quote", quoteSchema);

export default Quote;
