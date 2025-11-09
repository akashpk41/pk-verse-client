import { motion } from "framer-motion";
import { Palette } from "lucide-react";
import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";

const ThemeSelector = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="dropdown dropdown-end">
      {/* DROPDOWN TRIGGER */}
      <motion.button
        tabIndex={0}
        className="btn btn-circle btn-primary shadow-xl shadow-primary/50 hover:shadow-2xl hover:shadow-primary/60 relative overflow-hidden group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Animated glow */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-30 transition-opacity"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <Palette className="size-5 relative z-10" />
      </motion.button>

      <motion.div
        tabIndex={0}
        className="dropdown-content mt-3 w-[90vw] sm:w-80 md:w-96 bg-base-100/95 backdrop-blur-2xl rounded-2xl shadow-2xl border-2 border-primary/30 max-h-[70vh] sm:max-h-[500px] overflow-hidden z-50 fixed sm:absolute right-2 sm:right-0"
        initial={{ opacity: 0, y: -10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        {/* Header */}
        <div className="p-3 sm:p-4 border-b-2 border-primary/20 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="flex items-center gap-2">
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Palette className="size-6 sm:size-5 text-primary" />
            </motion.div>
            <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Choose Theme
            </h3>
          </div>
          <p className="text-base md:text-lg opacity-70 mt-1">
            Select your favorite color scheme
          </p>
        </div>

        {/* Theme List */}
        <div className="overflow-y-auto max-h-[calc(70vh-80px)] sm:max-h-[400px] p-1.5 sm:p-2 space-y-1 custom-scrollbar">
          {THEMES.map((themeOption, index) => {
            const Icon = themeOption.icon;
            const isActive = theme === themeOption.name;

            return (
              <motion.button
                key={themeOption.name}
                className={`
                  w-full px-3 cursor-pointer sm:px-4 py-2.5 sm:py-3 rounded-xl flex items-center gap-2 sm:gap-3 transition-all relative overflow-hidden group
                  ${
                    isActive
                      ? "bg-gradient-to-r from-primary/20 to-secondary/20 border-2 border-primary/40 shadow-lg shadow-primary/20"
                      : "hover:bg-base-200 border-2 border-transparent hover:border-primary/20"
                  }
                `}
                onClick={() => setTheme(themeOption.name)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.02 }}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Active glow effect */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10"
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                )}

                {/* Icon */}
                <motion.div
                  className={`relative z-10 flex-shrink-0 ${
                    isActive ? "text-primary" : "text-base-content/70"
                  }`}
                  animate={
                    isActive
                      ? {
                          rotate: [0, 10, -10, 0],
                          scale: [1, 1.1, 1],
                        }
                      : {}
                  }
                  transition={{
                    duration: 2,
                    repeat: isActive ? Infinity : 0,
                    ease: "easeInOut",
                  }}
                >
                  <Icon className="size-6" />
                </motion.div>

                {/* Label */}
                <span
                  className={`text-xl font-semibold flex-1 text-left relative z-10 truncate ${
                    isActive ? "text-primary" : ""
                  }`}
                >
                  {themeOption.label}
                </span>

                {/* Color Preview */}
                <div className="flex gap-0.5 sm:gap-1 relative z-10 flex-shrink-0">
                  {themeOption.colors.map((color, i) => (
                    <motion.span
                      key={i}
                      className="size-3 rounded-full ring-1 ring-base-content/20"
                      style={{ backgroundColor: color }}
                      whileHover={{ scale: 1.3 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    />
                  ))}
                </div>

                {/* Active checkmark */}
                {isActive && (
                  <motion.div
                    className="ml-1 sm:ml-2 relative z-10 flex-shrink-0"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  >
                    <div className="size-4 sm:size-5 rounded-full bg-primary text-primary-content flex items-center justify-center text-[10px] sm:text-xs font-bold">
                      ✓
                    </div>
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: hsl(var(--p) / 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: hsl(var(--p) / 0.5);
        }
      `}</style>
    </div>
  );
};

export default ThemeSelector;
