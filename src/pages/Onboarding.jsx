import { motion } from "framer-motion";
import { Camera, Gem, Loader2, MapPin, Shuffle } from "lucide-react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { LANGUAGES } from "../constants";
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
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    onboardingMutation(formState);
  };

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1; // 1-100 included
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

    setFormState({ ...formState, profilePic: randomAvatar });
    toast.success("Random profile picture generated!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-200 flex items-center justify-center p-2 md:p-4">
          <motion.div
            className="w-full max-w-4xl"

          >
            <div className="border-2 border-primary/50 bg-base-100/80 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden relative">
              {/* Animated background glow */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-2xl blur-3xl -z-10"
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <div className="p-6 sm:p-10">
                {/* HEADER */}
                <motion.div
                  className="text-center mb-8"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex justify-center mb-4">
                    <motion.div
                      className="relative"
                      animate={{
                        y: [0, -10, 0],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-primary/30 rounded-full blur-xl"
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.5, 0.8, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                      <Gem className="size-16 text-primary relative z-10 drop-shadow-2xl" />
                    </motion.div>
                  </div>

                  <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-3">
                    Complete Your Profile
                  </h1>
                  <p className="text-base md:text-lg">
                    <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent font-bold">
                      Tell us about yourself
                    </span>
                    <span className="opacity-70"> and start your </span>
                    <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent font-bold">
                      learning adventure
                    </span>
                    <motion.span
                      className="inline-block ml-1 text-xl"
                      animate={{
                        rotate: [0, 15, -15, 0],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      ✨
                    </motion.span>
                  </p>
                </motion.div>

                <div className="space-y-6">
                  {/* PROFILE PIC CONTAINER */}
                  <motion.div
                    className="flex flex-col items-center justify-center space-y-4"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {/* IMAGE PREVIEW with Ring */}
                    <div className="relative">
                      {/* Animated ring */}
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: "linear-gradient(45deg, var(--p), var(--s), var(--a))",
                          padding: "4px",
                        }}
                        animate={{
                          rotate: 360,
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <div className="w-full h-full bg-base-100 rounded-full" />
                      </motion.div>

                      {/* Profile Image */}
                      <div className="relative size-32 rounded-full bg-base-300 overflow-hidden">
                        {formState.profilePic ? (
                          <img
                            src={formState.profilePic}
                            alt="Profile Preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <Camera className="size-12 text-base-content opacity-40" />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Generate Random Avatar BTN */}
                    <motion.button
                      type="button"
                      onClick={handleRandomAvatar}
                      className="btn btn-accent shadow-lg shadow-accent/30 hover:shadow-xl shadow-accent/40"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Shuffle className="size-4 mr-2" />
                      Generate Random Avatar
                    </motion.button>
                  </motion.div>

                  {/* FULL NAME */}
                  <motion.div
                    className="form-control"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <label className="label">
                      <span className="label-text text-lg font-semibold">Full Name</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formState.fullName}
                      onChange={(e) =>
                        setFormState({ ...formState, fullName: e.target.value })
                      }
                      className="input input-bordered text-base w-full h-14 rounded-xl bg-base-200 border-2 border-base-300 focus:border-primary focus:bg-base-100 focus:outline-none focus:shadow-lg focus:shadow-primary/20 transition-all duration-300 hover:border-primary/50"
                      placeholder="Your full name"
                    />
                  </motion.div>

                  {/* BIO */}
                  <motion.div
                    className="form-control"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <label className="label">
                      <span className="label-text text-lg font-semibold">Bio</span>
                    </label>
                    <textarea
                      name="bio"
                      value={formState.bio}
                      onChange={(e) =>
                        setFormState({ ...formState, bio: e.target.value })
                      }
                      className="textarea text-base w-full textarea-bordered h-28 rounded-xl bg-base-200 border-2 border-base-300 focus:border-primary focus:bg-base-100 focus:outline-none focus:shadow-lg focus:shadow-primary/20 transition-all duration-300 hover:border-primary/50 resize-none"
                      placeholder="Tell others about yourself and your language learning goals"
                    />
                  </motion.div>

                  {/* LANGUAGES */}
                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    {/* NATIVE LANGUAGE */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-lg font-semibold">Native Language</span>
                      </label>
                      <select
                        name="nativeLanguage"
                        value={formState.nativeLanguage}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            nativeLanguage: e.target.value,
                          })
                        }
                        className="select select-bordered text-base w-full h-14 rounded-xl bg-base-200 border-2 border-base-300 focus:border-primary focus:bg-base-100 focus:outline-none focus:shadow-lg focus:shadow-primary/20 transition-all duration-300 hover:border-primary/50"
                      >
                        <option value="">Select your native language</option>
                        {LANGUAGES.map((lang) => (
                          <option key={`native-${lang}`} value={lang.toLowerCase()}>
                            {lang}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* LEARNING LANGUAGE */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-lg font-semibold">Learning Language</span>
                      </label>
                      <select
                        name="learningLanguage"
                        value={formState.learningLanguage}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            learningLanguage: e.target.value,
                          })
                        }
                        className="select select-bordered text-base w-full h-14 rounded-xl bg-base-200 border-2 border-base-300 focus:border-primary focus:bg-base-100 focus:outline-none focus:shadow-lg focus:shadow-primary/20 transition-all duration-300 hover:border-primary/50"
                      >
                        <option value="">Select language you're learning</option>
                        {LANGUAGES.map((lang) => (
                          <option key={`learning-${lang}`} value={lang.toLowerCase()}>
                            {lang}
                          </option>
                        ))}
                      </select>
                    </div>
                  </motion.div>

                  {/* LOCATION */}
                  <motion.div
                    className="form-control"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    <label className="label">
                      <span className="label-text text-lg font-semibold">Location</span>
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-primary">
                        <MapPin className="size-5 text-base-content/50 group-focus-within:text-primary transition-all duration-300 group-focus-within:scale-110" />
                      </div>
                      <input
                        type="text"
                        name="location"
                        value={formState.location}
                        onChange={(e) =>
                          setFormState({ ...formState, location: e.target.value })
                        }
                        className="input input-bordered text-base w-full pl-12 h-14 rounded-xl bg-base-200 border-2 border-base-300 focus:border-primary focus:bg-base-100 focus:outline-none focus:shadow-lg focus:shadow-primary/20 transition-all duration-300 hover:border-primary/50"
                        placeholder="City, Country"
                      />
                    </div>
                  </motion.div>

                  {/* SUBMIT BUTTON */}
                  <motion.button
                    className="btn btn-lg text-base md:text-xl btn-primary w-full h-16 rounded-xl shadow-xl shadow-primary/60 hover:shadow-2xl hover:shadow-primary/60 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-bold mt-2"
                    disabled={isPending}
                    type="submit"
                    onClick={handleSubmit}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    whileHover={{ scale: isPending ? 1 : 1.02, y: isPending ? 0 : -2 }}
                    whileTap={{ scale: isPending ? 1 : 0.98 }}
                  >
                    {!isPending ? (
                      <div className="flex items-center gap-2">
                        <Gem className="size-5" />
                        Complete Onboarding
                        <motion.span
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          →
                        </motion.span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Loader2 className="animate-spin size-6" />
                        Completing...
                      </div>
                    )}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
  );
}
