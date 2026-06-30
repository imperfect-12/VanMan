import BookingButton from "../components/BookingButton";
import { useForm } from "react-hook-form";
import { getQuote } from "../services/quoteService";
import { useState } from "react";

const QuoteForm = () => {
  const [estimate, setEstimate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
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
    try {
      setSubmitting(true);
      const { serviceType, loadSize, distance } = data;
      const res = await getQuote(serviceType, loadSize, distance);
      setEstimate(res.estimatedPrice);
      reset();
    } catch (err) {
      setEstimate("");
      setErrorMessage(
        err.response?.data?.message || "Unable to calculate quote right now.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-10">
      <div className="surface-panel mx-auto max-w-2xl rounded-lg p-8">
        <h2 className="mb-2 text-3xl font-bold tracking-tight text-slate-950">
          Get a Quote
        </h2>

        <p className="text-slate-600 mb-8">
          Get an instant estimate before booking your service.
        </p>

        {errorMessage && (
          <p className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Service Type */}
          <section className="space-y-3">
            <label className="block text-sm font-medium text-slate-700">
              Service Type
            </label>

            <select
              className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-white
                     focus:outline-none focus:ring-2 focus:ring-blue-500
                     focus:border-blue-500 transition"
              {...register("serviceType", {
                required: "select a service",
              })}
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

          {/* Distance */}
          <section className="space-y-3">
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
                  message: "distance must be atleast 1 km",
                },
              })}
            />
            {errors.distance && (
              <p className="text-sm text-red-600">
                {errors.distance.message}
              </p>
            )}
          </section>

          {/* Load Size */}
          <section className="space-y-3">
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
              <p className="text-sm text-red-600">
                {errors.loadSize.message}
              </p>
            )}
          </section>

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white
                   shadow-sm shadow-blue-600/20 hover:bg-blue-700 hover:shadow-md hover:shadow-blue-600/25
                   disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none
                   focus:outline-none
                   focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            disabled={submitting}
          >
            {submitting ? "Calculating..." : "Get Quote"}
          </button>

          {/* Estimate */}
          {estimate && (
            <div className="rounded-lg border border-blue-200 bg-blue-50/90 p-6 text-center shadow-inner">
              <p className="text-sm text-blue-700 font-medium mb-2">
                Estimated Charges
              </p>

              <p className="text-3xl font-bold text-blue-600">₹{estimate}</p>
            </div>
          )}

          {/* CTA */}
          {estimate && (
            <div className="border-t border-slate-200 pt-6 text-center space-y-4">
              <p className="text-slate-600">
                Happy with the estimate? Proceed to book your service.
              </p>

              <div className="flex justify-center">
                <BookingButton />
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default QuoteForm;
