import { useEffect, useState } from "react";
import { getBookings, getMembers } from "../services/adminService";
import BookingRow from "./BookingRow";

const BookingManager = () => {
  const [bookings, setBookings] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errMessage, setErrMessage] = useState(null);

  const fetchBookings = async () => {
    try {
      const bookingData = await getBookings();
      const membersData = await getMembers();
      setBookings(bookingData);
      setMembers(membersData);
    } catch (err) {
      console.error(err);
      setErrMessage(err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div>
      {errMessage && <p>{errMessage}</p>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table border="1" cellPadding="8" cellSpacing="0">
          <thead>
            <tr>
              <th scope="col">Customer</th>
              <th scope="col">Phone</th>
              <th scope="col">Service Date</th>
              <th scope="col">Pickup</th>
              <th scope="col">Drop</th>
              <th scope="col">Member Assigned</th>
              <th scope="col">Assigned Member</th>
              <th scope="col">Assign</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <BookingRow
                key={booking._id}
                booking={booking}
                members={members}
                onAssigned={fetchBookings}
                setErrorMessage={setErrMessage}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BookingManager;
