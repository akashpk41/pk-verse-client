import { axiosInstance } from "./axiosInstance";

export const signup = async (formData) => {
  const { data } = await axiosInstance.post("/auth/signup", formData);

  return data;
};

export const getAuthUser = async () => {
  const { data } = await axiosInstance.get("/auth/me");
  return data;
};
