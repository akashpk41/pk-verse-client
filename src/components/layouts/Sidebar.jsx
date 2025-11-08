import { motion } from "framer-motion";
import { Bell, Gem, Home, User, Users } from "lucide-react";
import { useLocation,Link } from "react-router";
import useAuthUser from "../../hooks/useAuthUser";

export default function Sidebar() {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/friends", icon: Users, label: "Friends" },
    { path: "/notifications", icon: Bell, label: "Notifications" },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <aside className="w-64 bg-gradient-to-b from-base-100 to-base-200 border-r-2 border-primary/20 hidden md:flex flex-col h-screen sticky top-0 backdrop-blur-xl relative overflow-hidden">
      {/* Animated background glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 -z-10"
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* LOGO SECTION */}
      <motion.div
        className="p-5 border-b-2 border-primary/20"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <a href="/" className="flex items-center gap-3 group cursor-pointer">
          <motion.div
            className="relative"
            animate={{
              y: [0, -5, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 bg-primary/30 rounded-full blur-lg"
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
            <Gem className="size-9 text-primary relative z-10 drop-shadow-lg group-hover:drop-shadow-[0_0_10px_rgba(var(--p),0.8)] transition-all duration-300" />
          </motion.div>

          <motion.span
            className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              backgroundSize: "200% 200%",
            }}
          >
            PK Verse
          </motion.span>
        </a>
      </motion.div>

      {/* NAVIGATION */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = currentPath === item.path;

          return (
            <motion.div
              key={item.path}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to={item.path}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl font-semibold
                  transition-all duration-300 relative overflow-hidden group
                  ${
                    isActive
                      ? "bg-gradient-to-r from-primary/20 to-secondary/20 text-primary shadow-lg shadow-primary/20 border-2 border-primary/30"
                      : "hover:bg-base-300/50 border-2 border-transparent hover:border-primary/20"
                  }
                `}
              >
                {/* Active indicator glow */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl"
                    animate={{
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                )}

                <Icon
                  className={`size-5 relative z-10 transition-all duration-300 ${
                    isActive
                      ? "text-primary drop-shadow-lg"
                      : "text-base-content/70 group-hover:text-primary group-hover:scale-110"
                  }`}
                />

                <span className="relative z-10 text-base">{item.label}</span>

                {/* Animated arrow on hover */}
                <motion.span
                  className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity relative z-10"
                  animate={{
                    x: isActive ? [0, 3, 0] : 0,
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: isActive ? Infinity : 0,
                  }}
                >
                  →
                </motion.span>
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* USER PROFILE SECTION */}
      <motion.div
        className="p-4 border-t-2 border-primary/20 mt-auto relative"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent pointer-events-none" />

        <div className="flex items-center gap-3 p-3 rounded-xl bg-base-200/50 backdrop-blur-sm border border-primary/30 hover:border-primary/40 transition-all duration-300 group cursor-pointer relative overflow-hidden">
          {/* Hover glow effect */}
          <motion.div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-100 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Avatar with animated ring */}
          <div className="relative">
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
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <div className="avatar relative">
              <div className="w-14 rounded-full ring-2 ring-base-100">
                <img src={authUser?.profilePic} alt="User Avatar" />
              </div>
            </div>
          </div>

          <div className="flex-1 relative z-10">
            <p className="font-bold text-md bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {authUser?.fullName}
            </p>
            <p className="text-xs text-green-500 flex items-center gap-1.5 font-semibold">
              <motion.span
                className="size-2 rounded-full bg-green-500 inline-block shadow-lg shadow-success/50"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              Online
            </p>
          </div>

          {/* Chevron indicator */}
          <motion.div
            className="text-base-content/50 group-hover:text-primary transition-colors relative z-10"
            animate={{
              x: [0, 3, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            →
          </motion.div>
        </div>
      </motion.div>
    </aside>
  );
}
