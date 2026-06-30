import Booking from "../models/booking.js";
import User from "../models/user.js";
import { calculateMovingEstimate } from "../utils/pricing.js";

const getBookingErrorMessage = (err, fallback) => {
  if (err.statusCode) return err.message;
  if (err.name === "ValidationError") {
    return Object.values(err.errors)
      .map((error) => error.message)
      .join(", ");
  }
  if (err.name === "CastError") {
    return `Invalid ${err.path}`;
  }
  return fallback;
};

export const createBooking = async (req, res) => {
  try {
    const {
      serviceType,
      loadSize,
      pickupLocation,
      dropLocation,
      distance,
      serviceDate,
      contactDetails,
      description,
    } = req.body;

    if (
      !serviceType ||
      !loadSize ||
      !pickupLocation ||
      !dropLocation ||
      distance === undefined ||
      distance === "" ||
      !serviceDate ||
      !contactDetails
    ) {
      return res.status(400).json({
        message: "all fields required",
      });
    }

    const { estimatedPrice } = calculateMovingEstimate({
      serviceType,
      loadSize,
      distance,
    });

    const booking = await Booking.create({
      user: req.user.id,
      serviceType,
      loadSize,
      pickupLocation,
      dropLocation,
      distance: Number(distance),
      serviceDate,
      contactDetails,
      description,
      bookingPrice: estimatedPrice,
    });

    res.status(201).json(booking);
  } catch (err) {
    console.error(err);
    res.status(err.statusCode || 500).json({
      message: getBookingErrorMessage(err, "Failed to create booking"),
    });
  }
};
export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id });
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching bookings" });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching bookings" });
  }
};

export const updateBooking = async (req, res) => {
  try {
    const { bookingid } = req.params;
    const updates = req.body;

    const booking = await Booking.findById(bookingid);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const editableFields = [
      "serviceType",
      "loadSize",
      "pickupLocation",
      "dropLocation",
      "distance",
      "serviceDate",
      "contactDetails",
      "description",
      "status",
    ];

    for (const field of editableFields) {
      if (updates[field] !== undefined) {
        booking[field] = updates[field];
      }
    }

    const { estimatedPrice } = calculateMovingEstimate({
      serviceType: booking.serviceType,
      loadSize: booking.loadSize,
      distance: booking.distance,
    });
    booking.distance = Number(booking.distance);
    booking.bookingPrice = estimatedPrice;

    const releasedMemberId = ["cancelled", "completed"].includes(
      booking.status,
    )
      ? booking.assignedMember
      : null;

    if (releasedMemberId) {
      booking.assignedMember = null;
      booking.memberAssigned = false;
    }

    await booking.save();

    if (releasedMemberId) {
      await User.findOneAndUpdate(
        {
          _id: releasedMemberId,
          role: "member",
          memberStatus: "assigned",
        },
        { memberStatus: "available" },
        { runValidators: true },
      );
    }

    res.json(booking);
  } catch (err) {
    console.error(err);
    res.status(err.statusCode || 500).json({
      message: getBookingErrorMessage(err, "Failed to update booking"),
    });
  }
};
