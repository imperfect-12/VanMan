import assert from "node:assert/strict";
import test from "node:test";
import { updateBooking } from "../controllers/bookingController.js";
import Booking from "../models/booking.js";
import User from "../models/user.js";

const makeResponse = () => ({
  statusCode: 200,
  body: undefined,
  status(code) {
    this.statusCode = code;
    return this;
  },
  json(body) {
    this.body = body;
    return this;
  },
});

const makeBooking = (overrides = {}) => ({
  serviceType: "furniture",
  loadSize: "medium",
  distance: 10,
  status: "confirmed",
  assignedMember: "member-1",
  memberAssigned: true,
  async save() {},
  ...overrides,
});

test("completing an assigned booking releases its member", async () => {
  const originalFindById = Booking.findById;
  const originalFindOneAndUpdate = User.findOneAndUpdate;
  const booking = makeBooking();
  let memberUpdate;

  Booking.findById = async () => booking;
  User.findOneAndUpdate = async (...args) => {
    memberUpdate = args;
  };

  try {
    const response = makeResponse();
    await updateBooking(
      { params: { bookingid: "booking-1" }, body: { status: "completed" } },
      response,
    );

    assert.equal(response.statusCode, 200);
    assert.equal(response.body, booking);
    assert.equal(booking.status, "completed");
    assert.equal(booking.assignedMember, null);
    assert.equal(booking.memberAssigned, false);
    assert.deepEqual(memberUpdate, [
      {
        _id: "member-1",
        role: "member",
        memberStatus: "assigned",
      },
      { memberStatus: "available" },
      { runValidators: true },
    ]);
  } finally {
    Booking.findById = originalFindById;
    User.findOneAndUpdate = originalFindOneAndUpdate;
  }
});

test("editing an active booking keeps its assignment and recalculates price", async () => {
  const originalFindById = Booking.findById;
  const originalFindOneAndUpdate = User.findOneAndUpdate;
  const booking = makeBooking();
  let releasedMember = false;

  Booking.findById = async () => booking;
  User.findOneAndUpdate = async () => {
    releasedMember = true;
  };

  try {
    const response = makeResponse();
    await updateBooking(
      {
        params: { bookingid: "booking-1" },
        body: { loadSize: "large", distance: 20 },
      },
      response,
    );

    assert.equal(response.statusCode, 200);
    assert.equal(booking.assignedMember, "member-1");
    assert.equal(booking.memberAssigned, true);
    assert.equal(booking.bookingPrice, 1100);
    assert.equal(releasedMember, false);
  } finally {
    Booking.findById = originalFindById;
    User.findOneAndUpdate = originalFindOneAndUpdate;
  }
});
