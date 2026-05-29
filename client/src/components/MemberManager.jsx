import { useState, useEffect } from "react";
import {
  getMembers,
  changeMemberStatus,
  deleteMember,
  addMember,
} from "../services/adminService";

const EMPTY_FORM = { name: "", email: "", phone: "" };

const MemberManager = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errMessage, setErrMessage] = useState(null);

  const [form, setForm] = useState(EMPTY_FORM);
  const [formError, setFormError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchMembers = async () => {
    try {
      const membersData = await getMembers();
      setMembers(membersData);
    } catch (err) {
      console.error(err);
      setErrMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    setFormError(null);

    const { name, email, phone } = form;
    if (!name.trim() || !email.trim()) {
      setFormError("Name and email are required.");
      return;
    }

    try {
      setSubmitting(true);
      await addMember({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
      });
      setForm(EMPTY_FORM);
      await fetchMembers();
    } catch (err) {
      console.error(err);
      setFormError(err.response?.data?.message || "Failed to add member.");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <div>
      <h2>Add Member</h2>
      <form
        onSubmit={handleAddMember}
        style={{
          display: "flex",
          gap: "8px",
          flexWrap: "wrap",
          marginBottom: "16px",
        }}
      >
        <input
          name="name"
          placeholder="Full name *"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email *"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="phone"
          type="tel"
          placeholder="Phone (optional)"
          value={form.phone}
          onChange={handleChange}
        />
        <button type="submit" disabled={submitting}>
          {submitting ? "Adding…" : "Add Member"}
        </button>
      </form>
      {formError && <p style={{ color: "red" }}>{formError}</p>}

      <h2>Members List</h2>
      {errMessage && <p>{errMessage}</p>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table border="1" cellPadding="8" cellSpacing="0">
          <thead>
            <tr>
              <th scope="col">Member Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone No.</th>
              <th scope="col">Member Status</th>
              <th scope="col">Change Status</th>
              <th scope="col">Delete Member</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member._id}>
                <td>{member?.name || "—"}</td>
                <td>{member?.email || "—"}</td>
                <td>{member?.phone || "—"}</td>
                <td>{member?.memberStatus || "—"}</td>
                <td>
                  <button
                    onClick={() => {
                      changeMemberStatus(member._id, "available");
                      fetchMembers();
                    }}
                  >
                    {member.memberStatus === "available"
                      ? "Assign"
                      : "Unassign"}
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      deleteMember(member._id);
                      fetchMembers();
                    }}
                    style={{ marginLeft: "8px", color: "red" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MemberManager;
