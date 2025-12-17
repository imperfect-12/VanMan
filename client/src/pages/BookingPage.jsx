const BookingPage = () => {
  return (
    <div>
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

        {/* Load details */}
        <section>
          <label>Load Size</label>
          <select required>
            <option value="">Select load size</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </section>

        {/* Date */}
        <section>
          <label>Service Date</label>
          <input type="date" required />
        </section>

        {/* Contact info*/}
        <section>
          <h3>Contact Details</h3>
          <input type="text" placeholder="Full Name" required />
          <input type="tel" placeholder="Phone Number" required />
          <input type="email" placeholder="Email Address" />
        </section>

        {/* Additional notes */}
        <section>
          <label>Additional Notes (optional)</label>
          <textarea placeholder="Any special instructions"></textarea>
        </section>

        {/* Submit */}
        <button type="submit">Confirm Booking</button>
      </form>
    </div>
  );
};

export default BookingPage;
