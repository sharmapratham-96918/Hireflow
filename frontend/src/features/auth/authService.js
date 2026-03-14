import API from "../../api/axios";

// LOGIN
 const login = async (userData) => {
  const response = await API.post("/auth/login", userData);
  return response.data;
};

// REGISTER
 const register = async (userData) => {
  const response = await API.post("/auth/register", userData);
  return response.data;
};

const authService = {login , register}

export default authService