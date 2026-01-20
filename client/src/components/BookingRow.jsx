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
    (m) => m._id === booking.assignedMember
  );

  return (
    <tr>
      <td>{booking.contactDetails?.name || "—"}</td>

      <td>{booking.contactDetails?.phone || "—"}</td>

      <td>{formatDate(booking.serviceDate)}</td>

      <td>{formatLocation(booking.pickupLocation)}</td>

      <td>{formatLocation(booking.dropLocation)}</td>

      <td>{booking.memberAssigned ? "Yes" : "No"}</td>

      <td>{assignedMemberObj?.name || "—"}</td>

      <td>
        {!booking.memberAssigned && (
          <>
            <select
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

            <button onClick={handleSave} disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </button>
          </>
        )}
        {booking.memberAssigned && "assigned"}
      </td>
    </tr>
  );
};

export default BookingRow;
