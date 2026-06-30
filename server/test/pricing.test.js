import assert from "node:assert/strict";
import test from "node:test";
import { calculateMovingEstimate } from "../utils/pricing.js";

test("calculates the shared moving estimate", () => {
  const result = calculateMovingEstimate({
    serviceType: "furniture",
    loadSize: "medium",
    distance: 10,
  });

  assert.deepEqual(result, {
    estimatedPrice: 750,
    meta: {
      serviceType: "furniture",
      loadSize: "medium",
      vehicleType: "van",
      items: 5,
      distance: 10,
    },
  });
});

test("accepts a numeric distance supplied as a string", () => {
  const result = calculateMovingEstimate({
    serviceType: "small-parcel",
    loadSize: "small",
    distance: "2.5",
  });

  assert.equal(result.estimatedPrice, 400);
  assert.equal(result.meta.distance, 2.5);
});

test("rejects unsupported pricing inputs", () => {
  assert.throws(
    () =>
      calculateMovingEstimate({
        serviceType: "spaceship",
        loadSize: "medium",
        distance: 10,
      }),
    { message: "Invalid service type", statusCode: 400 },
  );

  assert.throws(
    () =>
      calculateMovingEstimate({
        serviceType: "furniture",
        loadSize: "medium",
        distance: 0,
      }),
    { message: "Distance must be greater than 0", statusCode: 400 },
  );
});
