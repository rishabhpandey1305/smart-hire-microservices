import authApi from "@/api/authApi";

export const login = async (loginData) => {
  const response = await authApi.post("/auth/login", loginData);
  return response.data;
};

export const register = async (registerData) => {
  const response = await authApi.post("/auth/register", registerData);
  return response.data;
};