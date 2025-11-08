import { axiosInstance } from "./axiosInstance";

export const signup = async (formData) => {
  const { data } = await axiosInstance.post("/auth/signup", formData);

  return data;
};
