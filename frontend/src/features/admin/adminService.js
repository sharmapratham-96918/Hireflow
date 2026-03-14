import API from "../../api/axios";

// ADMIN DASHBOARD
const admin = async (token) => {
  const response = await API.get("/dashboard/admin", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const adminService = { admin };

export default adminService;