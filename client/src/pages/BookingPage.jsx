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
    <div>
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
        <section>
          <label>Pickup Location</label>
          <input
            type="text"
            placeholder="City"
            {...register("pickupLocation.city", {
              required: "enter pickup city",
            })}
          />
          <input
            type="text"
            placeholder="Area / Locality"
            {...register("pickupLocation.area", {
              required: "enter pickup area/locality",
            })}
          />
        </section>

        {/* Drop location */}
        <section>
          <label>Drop Location</label>
          <input
            type="text"
            placeholder="City"
            {...register("dropLocation.city", {
              required: "enter drop city",
            })}
          />
          <input
            type="text"
            placeholder="Area / Locality"
            {...register("dropLocation.area", {
              required: "enter drop area/locality",
            })}
          />
        </section>

        {/* Load details */}
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

        {/* Date */}
        <section>
          <label>Service Date</label>
          <input
            type="date"
            {...register("serviceDate", { required: "enter service date" })}
          />
        </section>

        {/* Contact info*/}
        <section>
          <label>Contact Details</label>
          <input
            type="text"
            placeholder="Full Name"
            defaultValue={user?.name || ""}
            {...register("contactDetails.name", {
              required: "enter your name",
            })}
          />
          <input
            type="tel"
            placeholder="Phone Number"
            {...register("contactDetails.phone", {
              required: "enter phone number",
            })}
          />
          <input
            type="email"
            placeholder="Email Address"
            defaultValue={user?.email || ""}
            {...register("contactDetails.email", {
              required: "enter the email",
            })}
          />
        </section>

        {/* Additional notes */}
        <section>
          <label>Additional Notes (optional)</label>
          <textarea
            {...register("description")}
            placeholder="Any special instructions"
          ></textarea>
        </section>

        {/* Submit */}
        <button type="submit">Confirm Booking</button>
      </form>
    </div>
  );
};

export default BookingPage;
