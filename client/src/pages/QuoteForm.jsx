import BookingButton from "../components/BookingButton";

const QuoteForm = () => {
  return (
    <div>
      <h2>Get a Quote</h2>
      <form>
        {/* Service type */}
        <section>
          <label>Service Type</label>
          <select required>
            <option value="">Select a service</option>
            <option value="small-parcel">Small Parcel</option>
            <option value="furniture">Furniture Move</option>
            <option value="house-move">Full House Move</option>
            <option value="helper-only">Helper Only</option>
          </select>
        </section>
        {/* Pickup location */}
        <section>
          <h3>Pickup Location</h3>
          <input type="text" placeholder="City" required />
          <input type="text" placeholder="Area / Locality" required />
        </section>
        {/* Drop location */}
        <section>
          <h3>Drop Location</h3>
          <input type="text" placeholder="City" required />
          <input type="text" placeholder="Area / Locality" required />
        </section>
        {/* Approx distance */}
        <section>
          <h3>Approx. Distance between destinations in km</h3>
          <input type="number" placeholder="distance" required />
        </section>
        {/* Load size */}
        <section>
          <label>Load Size</label>
          <select required>
            <option value="">Select load size</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </section>
        <button type="submit">Get Quote</button>
        <BookingButton />
      </form>
    </div>
  );
};

export default QuoteForm;
