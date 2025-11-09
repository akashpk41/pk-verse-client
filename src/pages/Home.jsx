import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { getOutgoingFriendReqs, getRecommendedUsers, getUserFriends } from "../lib/api";
export default function Home() {
    const queryClient = useQueryClient();
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());

    const { data: friends = [], isLoading: loadingFriends } = useQuery({
      queryKey: ["friends"],
      queryFn: getUserFriends,
    });

    const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
      queryKey: ["users"],
      queryFn: getRecommendedUsers,
    });


      const { data: outgoingFriendReqs } = useQuery({
        queryKey: ["outgoingFriendReqs"],
        queryFn: getOutgoingFriendReqs,
      });


  const { mutate: sendRequestMutation, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] }),
  });


  return (
    <div>
      <button onClick={() => toast.success("skdkfj")}>Welcome Home🔔</button>
    </div>
  );
}
