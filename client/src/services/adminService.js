import api from "../api/axios";

export const getBookings = async () => {
  const res = await api.get("/admin/bookings");
  return res.data;
};

export const changeMemberStatus = async (memberId, status) => {
  const res = await api.patch(`/admin/members/${memberId}/status`, { status });
  return res.data;
};

export const deleteMember = async (memberid) => {
  const res = await api.delete(`/admin/members/${memberid}`);
  return res.data;
};

export const assignMember = async (memberid, bookingid) => {
  const res = await api.patch(`/admin/bookings/${bookingid}/assign`, {
    memberid,
  });
  return res.data;
};

export const getMembers = async () => {
  const res = await api.get(`/admin/members/`);
  return res.data;
};
