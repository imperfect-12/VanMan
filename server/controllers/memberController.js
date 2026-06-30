import User from "../models/user.js";
import Booking from "../models/booking.js";

const MEMBER_STATUS_OPTIONS = ["available", "inactive"];
const ACTIVE_BOOKING_STATUSES = ["pending", "confirmed"];

const addMember = async (req, res) => {
  try {
    const { name, phone, email } = req.body;
    if (!name || !phone || !email) {
      return res
        .status(400)
        .json({ message: "name, email and phone are required" });
    }
    const member = await User.create({
      name,
      email,
      phone,
      role: "member",
      memberStatus: "available",
    });
    res.status(201).json(member);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message:
        "Failed to create member, make sure all details are entered and are correct",
    });
  }
};

const getMembers = async (req, res) => {
  try {
    const { includeInactive } = req.query;
    const filter = {
      role: "member",
    };
    if (includeInactive !== "true") {
      filter.memberStatus = { $ne: "inactive" };
    }
    const members = await User.find(filter);
    res.json(members);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "error getting members" });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!MEMBER_STATUS_OPTIONS.includes(status)) {
      return res.status(400).json({ message: "Invalid member status" });
    }

    const activeAssignment = await Booking.exists({
      assignedMember: req.params.id,
      status: { $in: ACTIVE_BOOKING_STATUSES },
    });

    if (activeAssignment) {
      return res.status(400).json({
        message: "Assigned members cannot be updated until unassigned",
      });
    }

    const member = await User.findByIdAndUpdate(
      req.params.id,
      { memberStatus: status },
      { new: true, runValidators: true },
    );

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    res.json(member);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "error updating status" });
  }
};

const deleteMember = async (req, res) => {
  try {
    const activeAssignment = await Booking.exists({
      assignedMember: req.params.id,
      status: { $in: ACTIVE_BOOKING_STATUSES },
    });

    if (activeAssignment) {
      return res.status(400).json({
        message: "Assigned members cannot be deleted until unassigned",
      });
    }

    const member = await User.findByIdAndUpdate(
      req.params.id,
      { memberStatus: "inactive" },
      { new: true, runValidators: true },
    );

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    res.json(member);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "error deleting member" });
  }
};

const assignMembers = async (req, res) => {
  try {
    const { bookingid } = req.params;
    const { memberid } = req.body;

    if (!memberid) {
      return res.status(400).json({ message: "memberid is required" });
    }
    const booking = await Booking.findById(bookingid);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.assignedMember) {
      return res
        .status(400)
        .json({ message: "Booking already has a member assigned" });
    }
    const member = await User.findOne({
      _id: memberid,
      role: "member",
      memberStatus: "available",
    });

    if (!member)
      return res
        .status(400)
        .json({ message: "Member not available or does not exist" });

    booking.assignedMember = member._id;
    booking.memberAssigned = true;
    booking.status = "confirmed";
    await booking.save();

    member.memberStatus = "assigned";
    await member.save();

    res.json({
      message: "Member assigned successfully",
      booking,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "failed to assign member",
    });
  }
};

export { addMember, deleteMember, updateStatus, getMembers, assignMembers };
