import { useForm } from "react-hook-form";
import { useAuthContext } from "../contexts/AuthContext";
import { newBooking } from "../services/bookingService";

const BookingPage = () => {
  const { user } = useAuthContext();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const res = await newBooking(data);
    reset();
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">
          Book a Service
        </h1>

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
            className="w-full bg-blue-600 text-white py-3 rounded-lg
                   font-medium hover:bg-blue-700 transition-colors
                   focus:outline-none focus:ring-2
                   focus:ring-blue-500 focus:ring-offset-2"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;
