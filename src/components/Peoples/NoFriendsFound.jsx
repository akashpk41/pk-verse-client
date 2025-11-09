import { UserX, Users, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const NoFriendsFound = () => {
  return (
    <motion.div
      className="border-2 border-primary/30 bg-gradient-to-br from-base-200/50 to-base-300/50 backdrop-blur-xl rounded-2xl p-10 sm:p-12 text-center relative overflow-hidden"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated background glow */}
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

      {/* Floating icons animation */}
      <div className="relative z-10">
        <div className="relative inline-block mb-6">
          {/* Main icon */}
          <motion.div
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="relative">
              {/* Glow effect */}
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

              <UserX className="size-20 sm:size-24 text-primary/60 relative z-10 mx-auto" />
            </div>
          </motion.div>

          {/* Floating sparkles */}
          <motion.div
            className="absolute -top-2 -right-2"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Sparkles className="size-6 text-secondary" />
          </motion.div>

          <motion.div
            className="absolute -bottom-2 -left-2"
            animate={{
              rotate: [360, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
              delay: 2,
            }}
          >
            <Sparkles className="size-5 text-accent" />
          </motion.div>
        </div>

        {/* Text content */}
        <div className="space-y-3 max-w-md mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            No friends yet
          </h3>

          <p className="text-base sm:text-lg opacity-70 leading-relaxed">
            Connect with language partners below to start practicing together!
          </p>

          {/* Decorative element */}
          <motion.div
            className="flex items-center justify-center gap-2 mt-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div
              animate={{
                x: [-3, 3, -3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Users className="size-5 text-primary" />
            </motion.div>
            <span className="text-sm opacity-60">Start building your network</span>
            <motion.div
              animate={{
                x: [3, -3, 3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Users className="size-5 text-secondary" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default NoFriendsFound;