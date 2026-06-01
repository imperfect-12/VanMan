import { useState } from "react";
import formatDate from "../utils/formatDate";
import formatLocation from "../utils/formatLocation";
import { changeMemberStatus, assignMember } from "../services/adminService";

const BookingRow = ({ booking, members, onAssigned, setErrMessage }) => {
  const [selectedMember, setSelectedMember] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!selectedMember) return alert("Select a member first");
    try {
      setLoading(true);
      await assignMember(selectedMember, booking._id);
      await changeMemberStatus(selectedMember, "assigned");
      onAssigned();
    } catch (err) {
      setErrMessage(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const assignedMemberObj = members.find(
    (m) => m._id === booking.assignedMember,
  );

  return (
    <tr className="hover:bg-slate-50 transition-colors">
      <td className="px-4 py-3 text-sm text-slate-700">
        {booking.contactDetails?.name || "—"}
      </td>

      <td className="px-4 py-3 text-sm text-slate-700">
        {booking.contactDetails?.phone || "—"}
      </td>

      <td className="px-4 py-3 text-sm text-slate-700">
        {formatDate(booking.serviceDate)}
      </td>

      <td className="px-4 py-3 text-sm text-slate-700">
        {formatLocation(booking.pickupLocation)}
      </td>

      <td className="px-4 py-3 text-sm text-slate-700">
        {formatLocation(booking.dropLocation)}
      </td>

      <td className="px-4 py-3">
        <span
          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
            booking.memberAssigned
              ? "bg-green-100 text-green-700"
              : "bg-amber-100 text-amber-700"
          }`}
        >
          {booking.memberAssigned ? "Yes" : "No"}
        </span>
      </td>

      <td className="px-4 py-3 text-sm text-slate-700">
        {assignedMemberObj?.name || "—"}
      </td>

      <td className="px-4 py-3">
        {!booking.memberAssigned ? (
          <div className="flex items-center gap-2">
            <select
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-500
                     focus:border-blue-500"
              value={selectedMember}
              onChange={(e) => setSelectedMember(e.target.value)}
            >
              <option value="">Select member</option>

              {members
                .filter((m) => m.memberStatus === "available")
                .map((m) => (
                  <option key={m._id} value={m._id}>
                    {m.name}
                  </option>
                ))}
            </select>

            <button
              className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm
                     font-medium hover:bg-blue-700 disabled:bg-slate-300
                     disabled:cursor-not-allowed transition-colors"
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        ) : (
          <span className="text-sm font-medium text-green-600">Assigned</span>
        )}
      </td>
    </tr>
  );
};

export default BookingRow;
