import { MapPin, CheckCircle, UserPlus, Loader2, Globe, BookOpen }
from "lucide-react";
import { Users,  } from "lucide-react";
import { motion } from "framer-motion";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CheckCircleIcon, MapPinIcon, UserPlusIcon, UsersIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  getOutgoingFriendReqs,
  getRecommendedUsers,
  getUserFriends,
  sendFriendRequest,
} from "../lib/api";

import { capitialize } from "../lib/utils";

import FriendCard, { getLanguageFlag } from "../components/Peoples/FriendCard";
import NoFriendsFound from "../components/Peoples/NoFriendsFound";

const Home = () => {
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

  useEffect(() => {
    const outgoingIds = new Set();
    if (outgoingFriendReqs && outgoingFriendReqs.length > 0) {
      outgoingFriendReqs.forEach((req) => {
        outgoingIds.add(req.recipient._id);
      });
      setOutgoingRequestsIds(outgoingIds);
    }
  }, [outgoingFriendReqs]);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto space-y-10">
        {/* Section Header - Upgraded */}
              <motion.div
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {/* Title with Icon */}
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Users className="size-8 sm:size-9 text-primary" />
                  </motion.div>
                  <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Your Friends
                  </h2>
                </div>

                {/* Friend Requests Button - Upgraded */}
                <Link to="/notifications">
                  <motion.button
                    className="btn btn-primary shadow-lg shadow-primary/40 hover:shadow-xl hover:shadow-primary/50 rounded-xl gap-2"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <UserPlus className="size-5" />
                    <span className="hidden sm:inline">Friend Requests</span>
                    <span className="sm:hidden">Requests</span>
                  </motion.button>
                </Link>
              </motion.div>

              {/* Loading State - Upgraded */}
              {loadingFriends ? (
                <motion.div
                  className="flex flex-col items-center justify-center py-16"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.div
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Loader2 className="size-12 text-primary" />
                  </motion.div>
                  <p className="mt-4 text-lg opacity-70">Loading your friends...</p>
                </motion.div>
              ) : friends.length === 0 ? (
                <NoFriendsFound />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-4">
                  {friends.map((friend) => (
                    <FriendCard key={friend._id} friend={friend} />
                  ))}
                </div>
              )}

{/* recommended users */}
 <section className="relative">
      {/* Section Header */}
      <motion.div

      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <motion.div

              >
                <Globe className="size-8 text-primary" />
              </motion.div>
              <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Meet New Learners
              </h2>
            </div>
            <p className="text-base my-5 md:text-lg opacity-70 flex items-center gap-2">
              <BookOpen className="size-4" />
              Discover perfect language exchange partners based on your profile
            </p>
          </div>
        </div>
      </motion.div>

      {/* Loading State */}
      {loadingUsers ? (
        <motion.div
          className="flex flex-col items-center justify-center py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Loader2 className="size-12 text-primary" />
          </motion.div>
          <p className="mt-4 text-lg opacity-70">Finding perfect matches for you...</p>
        </motion.div>
      ) : recommendedUsers.length === 0 ? (
        /* Empty State */
        <motion.div
          className="border-2 border-primary/30 bg-gradient-to-br from-base-200/50 to-base-300/50 backdrop-blur-xl rounded-2xl p-8 text-center relative overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5"
            animate={{
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Globe className="size-16 text-primary mx-auto mb-4 opacity-50" />
          </motion.div>
          <h3 className="font-bold text-xl mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            No recommendations available
          </h3>
          <p className="text-base-content opacity-70">
            Check back later for new language partners!
          </p>
        </motion.div>
      ) : (
        /* Users Grid */
        <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
          {recommendedUsers.map((user, index) => {
            const hasRequestBeenSent = outgoingRequestsIds.has(user._id);

            return (
              <motion.div
                key={user._id}
                className="border-2 border-primary/20 bg-gradient-to-br from-base-100 to-base-200 hover:from-base-200 hover:to-base-300 rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 relative overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                {/* Animated background glow */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{
                    backgroundPosition: ["0% 0%", "100% 100%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                <div className="p-6 space-y-4 relative z-10">
                  {/* User Header */}
                  <div className="flex items-start gap-4">
                    {/* Avatar with animated ring and glow */}
                    <div className="relative flex-shrink-0">
                      {/* Outer rotating ring */}
                      <motion.div
                        className="absolute -inset-2 rounded-full"
                        style={{
                          background: "linear-gradient(45deg, var(--p), var(--s), var(--a))",
                        }}
                        animate={{
                          rotate: 360,
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />

                      {/* Pulsing glow effect */}
                      <motion.div
                        className="absolute -inset-3 rounded-full bg-primary/30 blur-xl"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 0.8, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />

                      {/* Avatar image */}
                      <div className="avatar relative">
                        <div className="w-16 h-16 rounded-full ring-4 ring-base-100 overflow-hidden">
                          <img
                            src={user.profilePic}
                            alt={user.fullName}
                            className="object-cover"
                          />
                        </div>
                      </div>

                      {/* Online indicator */}
                      <motion.span
                        className="absolute bottom-0 right-0 size-4 bg-success rounded-full ring-2 ring-base-100 shadow-lg"
                        animate={{
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    </div>

                    {/* User Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent truncate">
                        {user.fullName}
                      </h3>
                      {user.location && (
                        <div className="flex items-center gap-1.5 text-sm opacity-70 mt-1">
                          <MapPin className="size-3.5 text-primary flex-shrink-0" />
                          <span className="truncate">{user.location}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Languages Section */}
                  <div className="space-y-2">
                    {/* Native Language */}
                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
                      <span className="text-2xl">{getLanguageFlag(user.nativeLanguage)}</span>
                      <div className="flex-1">
                        <p className="text-xs opacity-70 font-semibold">Native Speaker</p>
                        <p className="text-sm font-bold text-primary">
                          {capitialize(user.nativeLanguage)}
                        </p>
                      </div>
                    </div>

                    {/* Learning Language */}
                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-base-300/50 border border-base-content/10">
                      <span className="text-2xl">{getLanguageFlag(user.learningLanguage)}</span>
                      <div className="flex-1">
                        <p className="text-xs opacity-70 font-semibold">Currently Learning</p>
                        <p className="text-sm font-bold">
                          {capitialize(user.learningLanguage)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bio */}
                  {user.bio && (
                    <div className="p-3 rounded-xl bg-base-200/50 border border-base-content/10">
                      <p className="text-sm opacity-80 line-clamp-3">
                        "{user.bio}"
                      </p>
                    </div>
                  )}

                  {/* Action Button */}
                  <motion.button
                    className={`btn w-full h-12 rounded-xl font-bold shadow-lg transition-all duration-300 ${
                      hasRequestBeenSent
                        ? "btn-success bg-success/20 border-success/40 text-success cursor-default"
                        : "btn-primary shadow-primary/40 hover:shadow-xl hover:shadow-primary/50"
                    }`}
                    onClick={() => !hasRequestBeenSent && sendRequestMutation(user._id)}
                    disabled={hasRequestBeenSent || isPending}
                    whileHover={!hasRequestBeenSent ? { scale: 1.02 } : {}}
                    whileTap={!hasRequestBeenSent ? { scale: 0.98 } : {}}
                  >
                    {isPending ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="size-5 animate-spin" />
                        Sending...
                      </div>
                    ) : hasRequestBeenSent ? (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="size-5" />
                        Request Sent
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <UserPlus className="size-5" />
                        Send Friend Request
                      </div>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </section>

      </div>
    </div>
  );
};

export default Home;
