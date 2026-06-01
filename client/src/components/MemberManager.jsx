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
    <div className="space-y-8">
      {/* Add Member Section */}
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-slate-900 mb-6">
          Add Member
        </h2>

        <form
          onSubmit={handleAddMember}
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        >
          <input
            className="px-4 py-3 border border-slate-300 rounded-lg
                   focus:outline-none focus:ring-2
                   focus:ring-blue-500 focus:border-blue-500"
            name="name"
            placeholder="Full name *"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            className="px-4 py-3 border border-slate-300 rounded-lg
                   focus:outline-none focus:ring-2
                   focus:ring-blue-500 focus:border-blue-500"
            name="email"
            type="email"
            placeholder="Email *"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            className="px-4 py-3 border border-slate-300 rounded-lg
                   focus:outline-none focus:ring-2
                   focus:ring-blue-500 focus:border-blue-500"
            name="phone"
            type="tel"
            placeholder="Phone (optional)"
            value={form.phone}
            onChange={handleChange}
          />

          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-3 bg-blue-600 text-white rounded-lg
                   font-medium hover:bg-blue-700
                   disabled:bg-slate-300 disabled:cursor-not-allowed
                   transition-colors"
          >
            {submitting ? "Adding..." : "Add Member"}
          </button>
        </form>

        {formError && <p className="mt-4 text-sm text-red-600">{formError}</p>}
      </div>

      {/* Members List */}
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-slate-900 mb-6">
          Members List
        </h2>

        {errMessage && (
          <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errMessage}
          </p>
        )}

        {loading ? (
          <div className="flex justify-center py-10">
            <p className="text-slate-500">Loading...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-600">
                    Member Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-600">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-600">
                    Phone No.
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-600">
                    Member Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-600">
                    Change Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-600">
                    Delete Member
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200">
                {members.map((member) => {
                  const newStatus =
                    member.memberStatus === "available"
                      ? "inactive"
                      : "available";
                  const label =
                    member.memberStatus === "available"
                      ? "Deactivate"
                      : "Activate";
                  return (
                    <tr
                      key={member._id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-4 py-3 text-sm text-slate-700">
                        {member?.name || "—"}
                      </td>

                      <td className="px-4 py-3 text-sm text-slate-700">
                        {member?.email || "—"}
                      </td>

                      <td className="px-4 py-3 text-sm text-slate-700">
                        {member?.phone || "—"}
                      </td>

                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                            member?.memberStatus === "available"
                              ? "bg-green-100 text-green-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {member?.memberStatus || "—"}
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        <button
                          className="px-3 py-2 bg-blue-600 text-white rounded-lg
                               text-sm font-medium hover:bg-blue-700
                               transition-colors"
                          onClick={() => {
                            changeMemberStatus(member._id, newStatus);
                            fetchMembers();
                          }}
                        >
                          {label}
                        </button>
                      </td>

                      <td className="px-4 py-3">
                        <button
                          className="px-3 py-2 bg-red-600 text-white rounded-lg
                               text-sm font-medium hover:bg-red-700
                               transition-colors"
                          onClick={() => {
                            deleteMember(member._id);
                            fetchMembers();
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberManager;
