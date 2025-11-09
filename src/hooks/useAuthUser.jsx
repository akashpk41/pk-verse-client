import { useQuery } from "@tanstack/react-query";
import { getAuthUser } from "../lib/api";

export default function useAuth() {
  const { data: authData, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    retry: false,
  });
 
  const authUser = authData?.user;
  return { authUser, isLoading };
}
