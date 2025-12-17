import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema({
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
  distance: {
    type: Number,
    required: true,
  },
});

const Quote = mongoose.model("Quote", quoteSchema);

export default Quote;
