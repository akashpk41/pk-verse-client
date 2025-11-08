import { axiosInstance } from "./axiosInstance";

export const getAuthUser = async () => {
  const { data } = await axiosInstance.get("/auth/me");
  return data;
};

export const signup = async (formData) => {
  const { data } = await axiosInstance.post("/auth/signup", formData);

  return data;
};

export const login = async (loginData) => {
  const { data } = await axiosInstance.post("/auth/login", loginData);

  return data;
};
export const logout = async () => {
  const { data } = await axiosInstance.post("/auth/logout");

  return data;
};

export const completeOnboarding = async (userData) => {
  const response = await axiosInstance.post("/auth/onboarding", userData);
  return response.data;
};
