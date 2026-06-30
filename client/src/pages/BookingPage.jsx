import { useForm } from "react-hook-form";
import { useAuthContext } from "../contexts/useAuthContext";
import { newBooking } from "../services/bookingService";
import { useState } from "react";

const BookingPage = () => {
  const { user } = useAuthContext();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
    },
  } = useForm();

  const onSubmit = async (data) => {
    setErrorMessage("");
    setSuccessMessage("");
    try {
      setSubmitting(true);
      const booking = await newBooking(data);
      setSuccessMessage(
        `Booking created successfully. Estimated price: ₹${booking.bookingPrice}`,
      );
      reset();
    } catch (err) {
      setErrorMessage(
        err.response?.data?.message || "Unable to create booking right now.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-10">
      <div className="surface-panel mx-auto max-w-3xl rounded-lg p-8">
        <h1 className="mb-8 text-3xl font-bold tracking-tight text-slate-950">
          Book a Service
        </h1>

        {errorMessage && (
          <p className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </p>
        )}

        {successMessage && (
          <p className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            {successMessage}
          </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Service Type */}
          <section className="space-y-3 pb-6 border-b border-slate-200">
            <label className="block text-sm font-medium text-slate-700">
              Service Type
            </label>

            <select
              className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-white
                     focus:outline-none focus:ring-2 focus:ring-blue-500
                     focus:border-blue-500 transition"
              {...register("serviceType", { required: "select a service" })}
            >
              <option value="">Select a service</option>
              <option value="small-parcel">Small Parcel</option>
              <option value="furniture">Furniture Move</option>
              <option value="house-move">Full House Move</option>
              <option value="helper-only">Helper Only</option>
            </select>
            {errors.serviceType && (
              <p className="text-sm text-red-600">
                {errors.serviceType.message}
              </p>
            )}
          </section>

          {/* Pickup Location */}
          <section className="space-y-3 pb-6 border-b border-slate-200">
            <label className="block text-sm font-medium text-slate-700">
              Pickup Location
            </label>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="City"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-blue-500
                       focus:border-blue-500 transition"
                {...register("pickupLocation.city", {
                  required: "enter pickup city",
                })}
              />
              {errors.pickupLocation?.city && (
                <p className="text-sm text-red-600">
                  {errors.pickupLocation.city.message}
                </p>
              )}

              <input
                type="text"
                placeholder="Area / Locality"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-blue-500
                       focus:border-blue-500 transition"
                {...register("pickupLocation.area", {
                  required: "enter pickup area/locality",
                })}
              />
              {errors.pickupLocation?.area && (
                <p className="text-sm text-red-600">
                  {errors.pickupLocation.area.message}
                </p>
              )}
            </div>
          </section>

          {/* Drop Location */}
          <section className="space-y-3 pb-6 border-b border-slate-200">
            <label className="block text-sm font-medium text-slate-700">
              Drop Location
            </label>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="City"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-blue-500
                       focus:border-blue-500 transition"
                {...register("dropLocation.city", {
                  required: "enter drop city",
                })}
              />
              {errors.dropLocation?.city && (
                <p className="text-sm text-red-600">
                  {errors.dropLocation.city.message}
                </p>
              )}

              <input
                type="text"
                placeholder="Area / Locality"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-blue-500
                       focus:border-blue-500 transition"
                {...register("dropLocation.area", {
                  required: "enter drop area/locality",
                })}
              />
              {errors.dropLocation?.area && (
                <p className="text-sm text-red-600">
                  {errors.dropLocation.area.message}
                </p>
              )}
            </div>
          </section>

          {/* Load Details */}
          <section className="space-y-3 pb-6 border-b border-slate-200">
            <label className="block text-sm font-medium text-slate-700">
              Load Size
            </label>

            <select
              className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-white
                     focus:outline-none focus:ring-2 focus:ring-blue-500
                     focus:border-blue-500 transition"
              {...register("loadSize", {
                required: "select the load size",
              })}
            >
              <option value="">Select load size</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
            {errors.loadSize && (
              <p className="text-sm text-red-600">{errors.loadSize.message}</p>
            )}
          </section>

          {/* Distance */}
          <section className="space-y-3 pb-6 border-b border-slate-200">
            <label className="block text-sm font-medium text-slate-700">
              Approx Distance (km)
            </label>

            <input
              type="number"
              placeholder="Enter distance in kilometers"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-blue-500
                     focus:border-blue-500 transition"
              {...register("distance", {
                required: "enter the approx distance",
                valueAsNumber: true,
                min: {
                  value: 1,
                  message: "distance must be at least 1 km",
                },
              })}
            />
            {errors.distance && (
              <p className="text-sm text-red-600">{errors.distance.message}</p>
            )}
          </section>

          {/* Service Date */}
          <section className="space-y-3 pb-6 border-b border-slate-200">
            <label className="block text-sm font-medium text-slate-700">
              Service Date
            </label>

            <input
              type="date"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-blue-500
                     focus:border-blue-500 transition"
              {...register("serviceDate", {
                required: "enter service date",
              })}
            />
            {errors.serviceDate && (
              <p className="text-sm text-red-600">
                {errors.serviceDate.message}
              </p>
            )}
          </section>

          {/* Contact Details */}
          <section className="space-y-3 pb-6 border-b border-slate-200">
            <label className="block text-sm font-medium text-slate-700">
              Contact Details
            </label>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                defaultValue={user?.name || ""}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-blue-500
                       focus:border-blue-500 transition"
                {...register("contactDetails.name", {
                  required: "enter your name",
                })}
              />
              {errors.contactDetails?.name && (
                <p className="text-sm text-red-600">
                  {errors.contactDetails.name.message}
                </p>
              )}

              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-blue-500
                       focus:border-blue-500 transition"
                {...register("contactDetails.phone", {
                  required: "enter phone number",
                })}
              />
              {errors.contactDetails?.phone && (
                <p className="text-sm text-red-600">
                  {errors.contactDetails.phone.message}
                </p>
              )}
            </div>

            <input
              type="email"
              placeholder="Email Address"
              defaultValue={user?.email || ""}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-blue-500
                     focus:border-blue-500 transition"
              {...register("contactDetails.email", {
                required: "enter the email",
              })}
            />
            {errors.contactDetails?.email && (
              <p className="text-sm text-red-600">
                {errors.contactDetails.email.message}
              </p>
            )}
          </section>

          {/* Additional Notes */}
          <section className="space-y-3">
            <label className="block text-sm font-medium text-slate-700">
              Additional Notes (optional)
            </label>

            <textarea
              className="w-full min-h-32 px-4 py-3 border border-slate-300
                     rounded-lg resize-y
                     focus:outline-none focus:ring-2
                     focus:ring-blue-500 focus:border-blue-500 transition"
              {...register("description")}
              placeholder="Any special instructions"
            />
          </section>

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white
                   shadow-sm shadow-blue-600/20 hover:bg-blue-700 hover:shadow-md hover:shadow-blue-600/25
                   disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none
                   focus:outline-none focus:ring-2
                   focus:ring-blue-500 focus:ring-offset-2"
            disabled={submitting}
          >
            {submitting ? "Creating booking..." : "Confirm Booking"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;
