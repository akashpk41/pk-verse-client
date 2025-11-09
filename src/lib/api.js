import { axiosInstance } from "./axiosInstance";

export const getAuthUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data;
  } catch (error) {
    console.log("Error in getAuthUser:", error);
    return null;
  }
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




export async function getUserFriends() {
  const response = await axiosInstance.get("/users/friends");
  return response.data;
}

export async function getRecommendedUsers() {
  const response = await axiosInstance.get("/users");
  return response.data;
}



export async function getOutgoingFriendReqs() {
  const response = await axiosInstance.get("/users/outgoing-friend-requests");
  return response.data;
}


export async function sendFriendRequest(userId) {
  const response = await axiosInstance.post(`/users/friend-request/${userId}`);
  return response.data;
}
