import { motion } from "framer-motion";
import { MapPin, MessageCircle } from "lucide-react";

import { Link } from "react-router";
import { LANGUAGE_TO_FLAG } from "../../constants/index";

const FriendCard = ({ friend }) => {
  return (
    <motion.div
      className="border-2 border-primary/20 bg-gradient-to-br from-base-100 to-base-200 hover:from-base-200 hover:to-base-300 rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 relative overflow-hidden group"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Animated background glow on hover */}
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

      <div className="p-5 space-y-4 relative z-10">
        {/* USER INFO */}
        <div className="flex items-start gap-3">
          {/* Avatar with animated ring */}
          <div className="relative flex-shrink-0">
            {/* Rotating ring */}
            <motion.div
              className="absolute -inset-1.5 rounded-full"
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

            {/* Pulsing glow */}
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

            {/* Avatar */}
            <div className="avatar relative">
              <div className="w-14 h-14 rounded-full ring-4 ring-base-100">
                <img src={friend?.profilePic} alt={friend?.fullName} />
              </div>
            </div>

            {/* Online indicator */}
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

          {/* Name and Location */}
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-base bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent truncate">
              {friend.fullName}
            </h3>
            {friend.location && (
              <div className="flex items-center gap-1 text-sm opacity-70 mt-1">
                <MapPin className="size-3 text-primary flex-shrink-0" />
                <span className="truncate">{friend.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Bio - if exists */}
        {friend.bio && (
          <div className="p-3 rounded-xl bg-base-200/50 border border-base-content/10">
            <p className="text-sm opacity-80 line-clamp-2">
              "{friend.bio}"
            </p>
          </div>
        )}

        {/* Languages */}
        <div className="space-y-2">
          {/* Native Language */}
          <div className="flex items-center gap-2 p-2 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
            {getLanguageFlag(friend.nativeLanguage)}
            <div className="flex-1 min-w-0">
              <p className="text-xs opacity-70 font-semibold">Native Speaker</p>
              <p className="text-sm font-bold text-primary truncate capitalize">
                {friend.nativeLanguage}
              </p>
            </div>
          </div>

          {/* Learning Language */}
          <div className="flex items-center gap-2 p-2 rounded-lg bg-base-300/50 border border-base-content/10">
            {getLanguageFlag(friend.learningLanguage)}
            <div className="flex-1 min-w-0">
              <p className="text-xs opacity-70 font-semibold">Currently Learning</p>
              <p className="text-sm font-bold truncate capitalize">
                {friend.learningLanguage}
              </p>
            </div>
          </div>
        </div>

        {/* Message Button */}
        <Link to={`/chat/${friend._id}`}>
          <motion.button
            className="btn btn-primary w-full rounded-xl shadow-lg shadow-primary/40 hover:shadow-xl hover:shadow-primary/50 gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <MessageCircle className="size-4" />
            Message
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

export default FriendCard;
export function getLanguageFlag(language) {
  if (!language) return null;

  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];

  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${langLower} flag`}
        className="h-5 w-7 rounded object-cover flex-shrink-0 shadow-sm"
      />
    );
  }
  return null;
}
