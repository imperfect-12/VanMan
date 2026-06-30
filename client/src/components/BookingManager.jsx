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
    <div className="bg-white border border-slate-200 rounded-xl p-6">
      {errMessage && (
        <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errMessage}
        </p>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <p className="text-slate-500">Loading...</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600"
                >
                  Customer
                </th>

                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600"
                >
                  Phone
                </th>

                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600"
                >
                  Service Date
                </th>

                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600"
                >
                  Status
                </th>

                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600"
                >
                  Pickup
                </th>

                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600"
                >
                  Drop
                </th>

                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600"
                >
                  Distance
                </th>

                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600"
                >
                  Price
                </th>

                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600"
                >
                  Member Assigned
                </th>

                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600"
                >
                  Assigned Member
                </th>

                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600"
                >
                  Assign
                </th>

                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600"
                >
                  Edit
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200 bg-white">
              {bookings.map((booking) => (
                <BookingRow
                  key={booking._id}
                  booking={booking}
                  members={members}
                  onAssigned={fetchBookings}
                  setErrMessage={setErrMessage}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BookingManager;
