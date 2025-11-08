import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import useAuthUser from "../hooks/useAuthUser";
import { completeOnboarding } from "../lib/api";

export default function Onboarding() {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Profile Onboarded Successfully!");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });


  const handleSubmit = (e) => {
    e.preventDefault();

    onboardingMutation(formState);
  };


  return <div>Onboarding</div>;
}
