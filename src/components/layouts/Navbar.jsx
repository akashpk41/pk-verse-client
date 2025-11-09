import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Bell, Gem, Home, LogOut, Menu, User, Users, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router";
import useAuthUser from "../../hooks/useAuthUser";
import { logout } from "../../lib/api";
import ThemeSelector from "../ThemeSelector";

export default function Navbar() {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const queryClient = useQueryClient();
  const { mutate: logoutMutation } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      setIsSidebarOpen(false);
    },
  });

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/notifications", icon: Bell, label: "Notifications" },
    { path: "/friends", icon: Users, label: "Friends" },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  const currentPath = location.pathname;

  return (
    <>
      <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between w-full">
            {/* LOGO - Mobile: Always show, Desktop: Only on chat page */}
            <div className={`${isChatPage ? "block" : "md:hidden"}`}>
              <Link
                to="/"
                className="flex items-center gap-2.5 group cursor-pointer"
              >
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
                  {/* Glow effect behind icon */}
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
                  <Gem className="size-7 sm:size-9 text-primary relative z-10 drop-shadow-2xl filter group-hover:drop-shadow-[0_0_15px_rgba(var(--p),0.8)] transition-all duration-300" />
                </motion.div>

                <motion.span
                  className="text-xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent"
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
              </Link>
            </div>

            {/* Right side items */}
            <div className="flex items-center gap-2 sm:gap-3 ml-auto">
              {/* Theme Selector - Always visible */}
              <ThemeSelector />

              {authUser ? (
                <>
                  {/* Notifications - Only for logged in users */}
                  <Link to="/notifications">
                    <button className="btn btn-ghost btn-circle relative group">
                      <div className="absolute inset-0 bg-primary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <Bell className="h-5.5 w-5.5 sm:h-6 sm:w-6 text-primary relative z-10 drop-shadow-[0_0_8px_rgba(var(--p),0.5)] filter" />
                    </button>
                  </Link>

                  {/* User Avatar - Click to go to profile */}
                  <Link to="/profile">
                    <div className="relative cursor-pointer">
                      <motion.div
                        className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary via-secondary to-accent opacity-70 blur"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 0.8, 0.5],
                          rotate: 360,
                        }}
                        transition={{
                          scale: {
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                          },
                          opacity: {
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                          },
                          rotate: {
                            duration: 5,
                            repeat: Infinity,
                            ease: "linear",
                          },
                        }}
                      />
                      <div className="avatar relative">
                        <div className="w-10 sm:w-11 rounded-full ring-2 ring-primary">
                          <img src={authUser?.profilePic} alt="User Avatar" />
                        </div>
                      </div>
                    </div>
                  </Link>

                  {/* Hamburger Menu Button */}
                  <button
                    className="btn btn-ghost btn-circle"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  >
                    {isSidebarOpen ? (
                      <X className="h-5 w-5 sm:h-6 sm:w-6 text-base-content" />
                    ) : (
                      <Menu className="h-5 w-5 sm:h-6 sm:w-6 text-base-content" />
                    )}
                  </button>
                </>
              ) : (
                <>
                  {/* Login and Register links for non-authenticated users */}
                  <Link to="/login">
                    <button className="btn cursor-pointer btn-sm btn-outline">
                      Login
                    </button>
                  </Link>
                  <Link to="/signup">
                    <button className="btn cursor-pointer btn-sm btn-primary">
                      Register
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar Modal Overlay */}
      {authUser && isSidebarOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/20 z-40 backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          />

          {/* Sidebar Modal */}
          <aside className="fixed right-0 top-4 rounded rounded-2xl w-72 sm:w-80 bg-gradient-to-b from-base-100 to-base-200 border-l-2 border-primary/50 z-50 flex flex-col shadow-2xl">
            {/* Close Button - Top Right */}
            <div className="absolute top-2 right-4 z-10">
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="btn btn-circle btn-sm btn-ghost hover:bg-error/20 text-error transition-all"
              >
                <X className="h-10 w-10" />
              </button>
            </div>

            {/* User Profile Section - Top */}
            <div className="p-4 pt-6 border-b-2 border-primary/20 bg-gradient-to-t from-primary/5 to-transparent">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-base-200/50 backdrop-blur-sm border border-primary/30">
                {/* Avatar with animated ring */}
                <div className="relative">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary via-secondary to-accent opacity-70 blur"></div>
                  <div className="avatar relative">
                    <div className="w-16 rounded-full ring-2 ring-primary">
                      <img src={authUser?.profilePic} />
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <p className="font-bold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {authUser?.fullName}
                  </p>
                  <p className="text-xs text-green-500 flex items-center gap-1.5 font-semibold">
                    <span className="size-2 rounded-full bg-green-500 inline-block shadow-lg shadow-green-500/50 animate-pulse"></span>
                    Online
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPath === item.path;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsSidebarOpen(false)}
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
                    <Icon
                      className={`size-5 transition-all duration-300 ${
                        isActive
                          ? "text-primary"
                          : "text-base-content/70 group-hover:text-primary group-hover:scale-110"
                      }`}
                    />
                    <span className="text-base">{item.label}</span>
                    <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                      →
                    </span>
                  </Link>
                );
              })}
            </nav>

            {/* Logout Button - Bottom */}
            <div className="p-4 border-t-2 border-primary/20 bg-gradient-to-b from-transparent to-primary/5">
              <button
                onClick={() => logoutMutation()}
                className="w-full cursor-pointer flex items-center gap-3 px-4 py-3 rounded-xl font-semibold bg-error/10 hover:bg-error/20 text-error border-2 border-error/30 hover:border-error/50 transition-all duration-300 group"
              >
                <LogOut className="size-5 group-hover:scale-110 transition-transform" />
                <span className="text-base">Logout</span>
              </button>
            </div>
          </aside>
        </>
      )}
    </>
  );
}
