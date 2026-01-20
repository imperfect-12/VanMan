import { useState, useEffect } from "react";
import {
  getMembers,
  changeMemberStatus,
  deleteMember,
} from "../services/adminService";

const MemberManager = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState([]);
  const [errMessage, setErrMessage] = useState(null);

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
  useEffect(() => {
    fetchMembers();
  }, [members]);

  return (
    <div>
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
