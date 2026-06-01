import BookingButton from "../components/BookingButton";
import { useForm } from "react-hook-form";
import { getQuote } from "../services/quoteService";
import { useState } from "react";

const QuoteForm = () => {
  const [estimate, setEstimate] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const { serviceType, loadSize, distance } = data;
    const res = await getQuote(serviceType, loadSize, distance);
    setEstimate(res.estimatedPrice);
    reset();
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Get a Quote</h2>

        <p className="text-slate-600 mb-8">
          Get an instant estimate before booking your service.
        </p>

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
          </section>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg
                   font-medium hover:bg-blue-700
                   transition-colors focus:outline-none
                   focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Get Quote
          </button>

          {/* Estimate */}
          {estimate && (
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-6 text-center">
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
