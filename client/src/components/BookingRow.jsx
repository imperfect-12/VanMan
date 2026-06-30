import { useState } from "react";
import formatDate from "../utils/formatDate";
import formatLocation from "../utils/formatLocation";
import { assignMember, updateBooking } from "../services/adminService";

const toDateInputValue = (date) => {
  if (!date) return "";
  return new Date(date).toISOString().split("T")[0];
};

const createEditForm = (booking) => ({
  customerName: booking.contactDetails?.name || "",
  phone: booking.contactDetails?.phone || "",
  email: booking.contactDetails?.email || "",
  serviceType: booking.serviceType || "",
  loadSize: booking.loadSize || "",
  serviceDate: toDateInputValue(booking.serviceDate),
  status: booking.status || "pending",
  pickupCity: booking.pickupLocation?.city || "",
  pickupArea: booking.pickupLocation?.area || "",
  dropCity: booking.dropLocation?.city || "",
  dropArea: booking.dropLocation?.area || "",
  distance: booking.distance || "",
  description: booking.description || "",
});

const getApiErrorMessage = (err, fallback) => {
  const responseMessage = err.response?.data?.message;
  if (responseMessage) return responseMessage;
  if (err.response?.status) return `Request failed with status ${err.response.status}`;
  return err.message || fallback;
};

const BookingRow = ({ booking, members, onAssigned, setErrMessage }) => {
  const [selectedMember, setSelectedMember] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(() => createEditForm(booking));

  const handleSave = async () => {
    if (!selectedMember) return alert("Select a member first");
    try {
      setLoading(true);
      await assignMember(selectedMember, booking._id);
      onAssigned();
    } catch (err) {
      setErrMessage(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditChange = (e) => {
    setEditForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCancelEdit = () => {
    setEditForm(createEditForm(booking));
    setIsEditing(false);
  };

  const handleUpdateBooking = async () => {
    const requiredFields = [
      ["customerName", "Customer name"],
      ["phone", "Phone"],
      ["email", "Email"],
      ["serviceType", "Service type"],
      ["loadSize", "Load size"],
      ["serviceDate", "Service date"],
      ["pickupCity", "Pickup city"],
      ["pickupArea", "Pickup area"],
      ["dropCity", "Drop city"],
      ["dropArea", "Drop area"],
      ["distance", "Distance"],
    ];

    const missingField = requiredFields.find(
      ([field]) => String(editForm[field] ?? "").trim() === "",
    );

    if (missingField) {
      setErrMessage(`${missingField[1]} is required before saving.`);
      return;
    }

    const distance = Number(editForm.distance);
    if (!Number.isFinite(distance) || distance <= 0) {
      setErrMessage("Distance must be greater than 0.");
      return;
    }

    try {
      setLoading(true);
      setErrMessage(null);
      await updateBooking(booking._id, {
        serviceType: editForm.serviceType,
        loadSize: editForm.loadSize,
        serviceDate: editForm.serviceDate,
        status: editForm.status,
        pickupLocation: {
          city: editForm.pickupCity,
          area: editForm.pickupArea,
        },
        dropLocation: {
          city: editForm.dropCity,
          area: editForm.dropArea,
        },
        distance,
        contactDetails: {
          name: editForm.customerName,
          phone: editForm.phone,
          email: editForm.email,
        },
        description: editForm.description,
      });
      setIsEditing(false);
      await onAssigned();
    } catch (err) {
      setErrMessage(getApiErrorMessage(err, "Failed to update booking."));
    } finally {
      setLoading(false);
    }
  };

  const assignedMemberObj = members.find(
    (m) => m._id === booking.assignedMember,
  );

  if (isEditing) {
    return (
      <tr className="bg-blue-50/50 align-top">
        <td className="px-4 py-3">
          <div className="space-y-2">
            <input
              className="w-40 rounded-lg border border-slate-300 px-3 py-2 text-sm"
              name="customerName"
              value={editForm.customerName}
              onChange={handleEditChange}
              placeholder="Customer name"
            />
            <input
              className="w-40 rounded-lg border border-slate-300 px-3 py-2 text-sm"
              name="email"
              type="email"
              value={editForm.email}
              onChange={handleEditChange}
              placeholder="Email"
            />
          </div>
        </td>

        <td className="px-4 py-3">
          <input
            className="w-36 rounded-lg border border-slate-300 px-3 py-2 text-sm"
            name="phone"
            value={editForm.phone}
            onChange={handleEditChange}
            placeholder="Phone"
          />
        </td>

        <td className="px-4 py-3">
          <input
            className="w-36 rounded-lg border border-slate-300 px-3 py-2 text-sm"
            name="serviceDate"
            type="date"
            value={editForm.serviceDate}
            onChange={handleEditChange}
          />
        </td>

        <td className="px-4 py-3">
          <select
            className="w-32 rounded-lg border border-slate-300 px-3 py-2 text-sm"
            name="status"
            value={editForm.status}
            onChange={handleEditChange}
          >
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </td>

        <td className="px-4 py-3">
          <div className="space-y-2">
            <input
              className="w-36 rounded-lg border border-slate-300 px-3 py-2 text-sm"
              name="pickupCity"
              value={editForm.pickupCity}
              onChange={handleEditChange}
              placeholder="Pickup city"
            />
            <input
              className="w-36 rounded-lg border border-slate-300 px-3 py-2 text-sm"
              name="pickupArea"
              value={editForm.pickupArea}
              onChange={handleEditChange}
              placeholder="Pickup area"
            />
          </div>
        </td>

        <td className="px-4 py-3">
          <div className="space-y-2">
            <input
              className="w-36 rounded-lg border border-slate-300 px-3 py-2 text-sm"
              name="dropCity"
              value={editForm.dropCity}
              onChange={handleEditChange}
              placeholder="Drop city"
            />
            <input
              className="w-36 rounded-lg border border-slate-300 px-3 py-2 text-sm"
              name="dropArea"
              value={editForm.dropArea}
              onChange={handleEditChange}
              placeholder="Drop area"
            />
          </div>
        </td>

        <td className="px-4 py-3">
          <input
            className="w-24 rounded-lg border border-slate-300 px-3 py-2 text-sm"
            name="distance"
            type="number"
            min="1"
            placeholder="Km"
            value={editForm.distance}
            onChange={handleEditChange}
          />
        </td>

        <td className="px-4 py-3 text-sm font-semibold text-blue-700">
          Recalculated
        </td>

        <td className="px-4 py-3">
          <span className="text-sm text-slate-500">
            {booking.memberAssigned ? "Yes" : "No"}
          </span>
        </td>

        <td className="px-4 py-3 text-sm text-slate-700">
          {assignedMemberObj?.name || "—"}
        </td>

        <td className="px-4 py-3 text-sm text-slate-500">Disabled</td>

        <td className="px-4 py-3">
          <div className="flex gap-2">
            <button
              className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:bg-slate-300"
              onClick={handleUpdateBooking}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
              onClick={handleCancelEdit}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </td>
      </tr>
    );
  }

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

      <td className="px-4 py-3">
        <span className="inline-flex rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium capitalize text-blue-700">
          {booking.status}
        </span>
      </td>

      <td className="px-4 py-3 text-sm text-slate-700">
        {formatLocation(booking.pickupLocation)}
      </td>

      <td className="px-4 py-3 text-sm text-slate-700">
        {formatLocation(booking.dropLocation)}
      </td>

      <td className="px-4 py-3 text-sm text-slate-700">
        {booking.distance} km
      </td>

      <td className="px-4 py-3 text-sm font-semibold text-blue-700">
        ₹{booking.bookingPrice}
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

      <td className="px-4 py-3">
        <button
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          onClick={() => setIsEditing(true)}
        >
          Edit
        </button>
      </td>
    </tr>
  );
};

export default BookingRow;
