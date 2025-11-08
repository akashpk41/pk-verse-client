import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axiosInstance";

export default function useAuth() {
  const { data: authData } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/auth/me");
      return data;
    },
    retry: false,
  });

  const authUser = authData?.user;
  return authUser;
}
