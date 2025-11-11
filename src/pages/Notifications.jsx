import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  Bell,
  CheckCircle,
  Clock,
  Loader2,
  Send,
  UserCheck,
} from "lucide-react";
import { Link } from "react-router";
import { acceptFriendRequest, getFriendRequests } from "../lib/api";

const Notifications = () => {
  const queryClient = useQueryClient();

  const { data: friendRequests, isLoading } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
  });

  const { mutate: acceptRequestMutation, isPending } = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });

  const incomingRequests = friendRequests?.incomingReqs || [];
  const acceptedRequests = friendRequests?.acceptedReqs || [];

  return (
    <div className="p-3 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-5xl space-y-8">
        {/* Page Header */}
        <motion.div
          className="flex items-center gap-3"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            animate={{
              rotate: [0, 15, -15, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Bell className="size-8 sm:size-10 text-primary" />
          </motion.div>
          <h1 className="text-3xl text-center md:text-start sm:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Notifications
          </h1>
        </motion.div>

        {isLoading ? (
          /* Premium Loading State */
          <motion.div
            className="flex flex-col items-center justify-center py-20"
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
              <Loader2 className="size-14 text-primary" />
            </motion.div>
            <motion.div
              className="mt-4 text-lg opacity-70"
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Loading notifications...
            </motion.div>
          </motion.div>
        ) : (
          <>
            {/* INCOMING FRIEND REQUESTS */}
            {incomingRequests.length > 0 && (
              <motion.section
                className="space-y-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center gap-3">
                  <UserCheck className="size-6 text-primary" />
                  <h2 className="text-xl sm:text-2xl font-bold">
                    Friend Requests
                  </h2>
                  <span className="badge badge-primary badge-lg shadow-lg shadow-primary/40">
                    {incomingRequests.length}
                  </span>
                </div>

                <div className="space-y-3">
                  {incomingRequests.map((request, index) => (
                    <motion.div
                      key={request._id}
                      className="border-2 border-primary/20 bg-gradient-to-br from-base-100 to-base-200 hover:from-base-200 hover:to-base-300 rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 relative overflow-hidden group"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -3 }}
                    >
                      {/* Animated background glow */}
                      <motion.div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div className="p-4 sm:p-5 relative z-10">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          {/* User Info */}
                          <div className="flex items-start gap-3 flex-1 min-w-0">
                            {/* Avatar with ring */}
                            <div className="relative flex-shrink-0">
                              <motion.div
                                className="absolute -inset-1 rounded-full"
                                style={{
                                  background:
                                    "linear-gradient(45deg, var(--p), var(--s), var(--a))",
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
                              <motion.div
                                className="absolute -inset-2 rounded-full bg-primary/30 blur-lg"
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
                              <div className="avatar relative">
                                <div className="w-14 h-14 rounded-full ring-4 ring-base-100">
                                  <img
                                    src={request?.sender?.profilePic}
                                    alt={request?.sender?.fullName}
                                  />
                                </div>
                              </div>
                              <motion.span
                                className="absolute bottom-0 right-0 size-3.5 bg-success rounded-full ring-2 ring-base-100 shadow-lg"
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

                            {/* Details */}
                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-base sm:text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent truncate">
                                {request?.sender?.fullName}
                              </h3>
                              <div className="flex flex-wrap gap-1.5 mt-2">
                                <span className="badge badge-sm bg-gradient-to-r from-primary/20 to-secondary/20 border-primary/30 text-primary font-semibold">
                                  Native: {request.sender.nativeLanguage}
                                </span>
                                <span className="badge badge-sm badge-outline">
                                  Learning: {request.sender.learningLanguage}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Accept Button */}
                          <motion.button
                            className="btn btn-primary rounded-xl shadow-lg shadow-primary/40 hover:shadow-xl hover:shadow-primary/50 gap-2 w-full sm:w-auto"
                            onClick={() => acceptRequestMutation(request._id)}
                            disabled={isPending}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {isPending ? (
                              <>
                                <Loader2 className="size-4 animate-spin" />
                                <span className="hidden sm:inline">
                                  Processing...
                                </span>
                              </>
                            ) : (
                              <>
                                <CheckCircle className="size-4" />
                                Accept
                              </>
                            )}
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* ACCEPTED REQUESTS / NEW CONNECTIONS */}
            {acceptedRequests.length > 0 && (
              <motion.section
                className="space-y-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center gap-3">
                  <Bell className="size-6 text-success" />
                  <h2 className="text-xl sm:text-2xl font-bold">
                    New Connections
                  </h2>
                </div>

                <div className="space-y-3">
                  {acceptedRequests.map((notification, index) => (
                    <motion.div
                      key={notification._id}
                      className="border-2 border-success/20 bg-gradient-to-br from-base-100 to-base-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -3 }}
                    >
                      <div className="p-4 sm:p-5 space-y-3">
                        <div className="flex items-start gap-3">
                          {/* Avatar */}
                          <div className="relative flex-shrink-0">
                            <motion.div
                              className="absolute -inset-1 rounded-full"
                              style={{
                                background:
                                  "linear-gradient(45deg, var(--su), var(--p))",
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
                            <div className="avatar relative">
                              <div className="w-12 h-12 rounded-full ring-4 ring-base-100">
                                <img
                                  src={notification?.recipient?.profilePic}
                                  alt={notification?.recipient?.fullName}
                                />
                              </div>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-base bg-gradient-to-r from-success to-primary bg-clip-text text-transparent truncate">
                              {notification?.recipient?.fullName}
                            </h3>
                            <p className="text-sm my-1 opacity-90">
                              {notification?.recipient?.fullName} accepted your
                              friend request
                            </p>
                            <p className="text-xs flex items-center gap-1 opacity-60">
                              <Clock className="size-3" />
                              Recently
                            </p>
                          </div>

                          {/* New Friend Badge */}
                          <div className="badge badge-success gap-1 shadow-lg shadow-success/30">
                            <CheckCircle className="size-3" />
                            <span className="hidden sm:inline">New Friend</span>
                          </div>
                        </div>

                        {/* Send Message Button */}
                        <Link to={`/chat/${notification?.recipient?._id}`}>
                          <motion.button
                            className="btn btn-success btn-outline w-full rounded-xl gap-2 hover:shadow-lg hover:shadow-success/30"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Send className="size-4" />
                            Send Message
                          </motion.button>
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Empty State */}
            {incomingRequests.length === 0 && acceptedRequests.length === 0 && (
              <NoNotificationsFound />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Notifications;

/* NoNotificationsFound Component */
function NoNotificationsFound() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-20 text-center"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative mb-6">
        <motion.div
          className="absolute inset-0 bg-primary/30 rounded-full blur-2xl"
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
        <motion.div
          className="size-20 rounded-full bg-gradient-to-br from-base-200 to-base-300 flex items-center justify-center relative z-10"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Bell className="size-10 text-primary/60" />
        </motion.div>
      </div>

      <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        No notifications yet
      </h3>
      <p className="text-base-content opacity-70 max-w-md text-base sm:text-lg">
        When you receive friend requests or messages, they'll appear here.
      </p>
    </motion.div>
  );
}
