import { Users, UserPlus, Loader2 } from "lucide-react";
import { Link } from "react-router";
import { motion } from "framer-motion";

// Mock data - replace with your actual data
const loadingFriends = false;
const friends = [];
const NoFriendsFound = () => <div>No Friends Component</div>;
const FriendCard = ({ friend }) => <div>Friend Card</div>;

export default function FriendsInlineSection() {
  return (
    <>
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
    </>
  );
}