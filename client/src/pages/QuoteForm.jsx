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
    <div>
      <h2>Get a Quote</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Service type */}
        <section>
          <label>Service Type</label>
          <select
            {...register("serviceType", { required: "select a service" })}
          >
            <option value="">Select a service</option>
            <option value="small-parcel">Small Parcel</option>
            <option value="furniture">Furniture Move</option>
            <option value="house-move">Full House Move</option>
            <option value="helper-only">Helper Only</option>
          </select>
        </section>
        {/* Pickup location */}
        {/* <section>
          <label>Pickup Location</label>
          <input
            type="text"
            placeholder="City"
            required
          />
          <input type="text" placeholder="Area / Locality" required />
        </section> */}
        {/* Drop location */}
        {/* <section>
          <h3>Drop Location</h3>
          <input type="text" placeholder="City" required />
          <input type="text" placeholder="Area / Locality" required />
        </section> */}
        {/* Approx distance */}
        <section>
          <label>Approx Distance in km</label>
          <input
            type="number"
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
        {/* Load size */}
        <section>
          <label>Load Size</label>
          <select
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
        <button type="submit">Get Quote</button>
        {estimate && <p>Estimated charges: {estimate}</p>}

        <p>Happy with the estimate? Proceed to book your service.</p>
        <BookingButton />
      </form>
    </div>
  );
};

export default QuoteForm;
