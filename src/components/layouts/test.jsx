import { AnimatePresence, motion } from "framer-motion";
import {
  Briefcase,
  Building2,
  Cake,
  Clock,
  Cloud,
  Coffee,
  Droplets,
  Eclipse,
  Feather,
  Flame,
  Flower2,
  Gem,
  Ghost,
  Grid3x3,
  Heart,
  Moon,
  Mountain,
  Palette,
  Radio,
  Skull,
  Snowflake,
  Sparkles,
  Star,
  Sun,
  Sunset,
  Trees,
  Waves,
  Wine,
  Zap,
} from "lucide-react";
import { useState } from "react";

// Theme data with icons
const THEMES = [
  {
    name: "light",
    label: "Light",
    colors: ["#ffffff", "#5a67d8", "#8b5cf6", "#1a202c"],
    icon: Sun,
  },
  {
    name: "dark",
    label: "Dark",
    colors: ["#1f2937", "#8b5cf6", "#ec4899", "#1a202c"],
    icon: Moon,
  },
  {
    name: "cupcake",
    label: "Cupcake",
    colors: ["#f5f5f4", "#65c3c8", "#ef9fbc", "#291334"],
    icon: Cake,
  },
  {
    name: "forest",
    label: "Forest",
    colors: ["#1f1d1d", "#3ebc96", "#70c217", "#e2e8f0"],
    icon: Trees,
  },
  {
    name: "bumblebee",
    label: "Bumblebee",
    colors: ["#ffffff", "#f8e36f", "#f0d50c", "#1c1917"],
    icon: Sparkles,
  },
  {
    name: "emerald",
    label: "Emerald",
    colors: ["#ffffff", "#66cc8a", "#3b82f6", "#1e3a8a"],
    icon: Gem,
  },
  {
    name: "corporate",
    label: "Corporate",
    colors: ["#ffffff", "#4b6bfb", "#7b92b2", "#1d232a"],
    icon: Briefcase,
  },
  {
    name: "synthwave",
    label: "Synthwave",
    colors: ["#2d1b69", "#e779c1", "#58c7f3", "#f8f8f2"],
    icon: Radio,
  },
  {
    name: "retro",
    label: "Retro",
    colors: ["#e4d8b4", "#ea6962", "#6aaa64", "#282425"],
    icon: Clock,
  },
  {
    name: "cyberpunk",
    label: "Cyberpunk",
    colors: ["#ffee00", "#ff7598", "#75d1f0", "#1a103d"],
    icon: Zap,
  },
  {
    name: "valentine",
    label: "Valentine",
    colors: ["#f0d6e8", "#e96d7b", "#a991f7", "#37243c"],
    icon: Heart,
  },
  {
    name: "halloween",
    label: "Halloween",
    colors: ["#0d0d0d", "#ff7800", "#006400", "#ffffff"],
    icon: Ghost,
  },
  {
    name: "garden",
    label: "Garden",
    colors: ["#e9e7e7", "#ec4899", "#16a34a", "#374151"],
    icon: Flower2,
  },
  {
    name: "aqua",
    label: "Aqua",
    colors: ["#193549", "#4cd4e3", "#9059ff", "#f8d766"],
    icon: Droplets,
  },
  {
    name: "lofi",
    label: "Lofi",
    colors: ["#0f0f0f", "#1a1919", "#232323", "#2c2c2c"],
    icon: Cloud,
  },
  {
    name: "pastel",
    label: "Pastel",
    colors: ["#f7f3f5", "#d1c1d7", "#a1e3d8", "#4a98f1"],
    icon: Feather,
  },
  {
    name: "fantasy",
    label: "Fantasy",
    colors: ["#ffe7d6", "#a21caf", "#3b82f6", "#f59e0b"],
    icon: Star,
  },
  {
    name: "wireframe",
    label: "Wireframe",
    colors: ["#e6e6e6", "#b3b3b3", "#b3b3b3", "#888888"],
    icon: Grid3x3,
  },
  {
    name: "black",
    label: "Black",
    colors: ["#000000", "#191919", "#313131", "#4a4a4a"],
    icon: Eclipse,
  },
  {
    name: "luxury",
    label: "Luxury",
    colors: ["#171618", "#1e293b", "#94589c", "#d4a85a"],
    icon: Gem,
  },
  {
    name: "dracula",
    label: "Dracula",
    colors: ["#282a36", "#ff79c6", "#bd93f9", "#f8f8f2"],
    icon: Skull,
  },
  {
    name: "cmyk",
    label: "CMYK",
    colors: ["#f0f0f0", "#0891b2", "#ec4899", "#facc15"],
    icon: Palette,
  },
  {
    name: "autumn",
    label: "Autumn",
    colors: ["#f2f2f2", "#8c1f11", "#f28c18", "#6f4930"],
    icon: Flame,
  },
  {
    name: "business",
    label: "Business",
    colors: ["#f5f5f5", "#1e40af", "#3b82f6", "#f97316"],
    icon: Building2,
  },
  {
    name: "acid",
    label: "Acid",
    colors: ["#110e0e", "#ff00f2", "#ff7a00", "#99ff01"],
    icon: Zap,
  },
  {
    name: "lemonade",
    label: "Lemonade",
    colors: ["#ffffff", "#67e8f9", "#f5d742", "#2c3333"],
    icon: Sun,
  },
  {
    name: "night",
    label: "Night",
    colors: ["#0f172a", "#38bdf8", "#818cf8", "#e2e8f0"],
    icon: Moon,
  },
  {
    name: "coffee",
    label: "Coffee",
    colors: ["#20161f", "#dd9866", "#497174", "#eeeeee"],
    icon: Coffee,
  },
  {
    name: "winter",
    label: "Winter",
    colors: ["#ffffff", "#0284c7", "#d946ef", "#0f172a"],
    icon: Snowflake,
  },
  {
    name: "dim",
    label: "Dim",
    colors: ["#1c1c27", "#10b981", "#ff5a5f", "#0f172a"],
    icon: Moon,
  },
  {
    name: "nord",
    label: "Nord",
    colors: ["#eceff4", "#5e81ac", "#81a1c1", "#3b4252"],
    icon: Mountain,
  },
  {
    name: "sunset",
    label: "Sunset",
    colors: ["#1e293b", "#f5734c", "#ec4899", "#ffffff"],
    icon: Sunset,
  },
  {
    name: "caramellatte",
    label: "Caramellatte",
    colors: ["#f7e1c7", "#ff9e5f", "#7b3c4b", "#2a2a2a"],
    icon: Wine,
  },
  {
    name: "abyss",
    label: "Abyss",
    colors: ["#1b2430", "#9d8b7e", "#4a8d7b", "#232c39"],
    icon: Waves,
  },
  {
    name: "silk",
    label: "Silk",
    colors: ["#eae7ff", "#b97bd9", "#9b8dff", "#2d3c45"],
    icon: Feather,
  },
];

const ThemeSelector = () => {
  const [theme, setTheme] = useState("dark");
  const [isOpen, setIsOpen] = useState(false);

  const handleThemeChange = (themeName) => {
    setTheme(themeName);
    document.documentElement.setAttribute("data-theme", themeName);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* DROPDOWN TRIGGER */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
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

      {/* DROPDOWN CONTENT */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown Menu */}
            <motion.div
              className="absolute right-0 mt-3 w-72 bg-base-100/95 backdrop-blur-2xl rounded-2xl shadow-2xl border-2 border-primary/30 max-h-[500px] overflow-hidden z-50"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {/* Header */}
              <div className="p-4 border-b-2 border-primary/20 bg-gradient-to-r from-primary/10 to-secondary/10">
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
                    <Palette className="size-5 text-primary" />
                  </motion.div>
                  <h3 className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Choose Theme
                  </h3>
                </div>
                <p className="text-xs opacity-70 mt-1">
                  Select your favorite color scheme
                </p>
              </div>

              {/* Theme List */}
              <div className="overflow-y-auto max-h-[400px] p-2 space-y-1 custom-scrollbar">
                {THEMES.map((themeOption, index) => {
                  const Icon = themeOption.icon;
                  const isActive = theme === themeOption.name;

                  return (
                    <motion.button
                      key={themeOption.name}
                      className={`
                        w-full px-4 py-3 rounded-xl flex items-center gap-3 transition-all relative overflow-hidden group
                        ${
                          isActive
                            ? "bg-gradient-to-r from-primary/20 to-secondary/20 border-2 border-primary/40 shadow-lg shadow-primary/20"
                            : "hover:bg-base-200 border-2 border-transparent hover:border-primary/20"
                        }
                      `}
                      onClick={() => handleThemeChange(themeOption.name)}
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
                        className={`relative z-10 ${
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
                        <Icon className="size-5" />
                      </motion.div>

                      {/* Label */}
                      <span
                        className={`text-sm font-semibold flex-1 text-left relative z-10 ${
                          isActive ? "text-primary" : ""
                        }`}
                      >
                        {themeOption.label}
                      </span>

                      {/* Color Preview */}
                      <div className="flex gap-1 relative z-10">
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
                          className="ml-2 relative z-10"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 15,
                          }}
                        >
                          <div className="size-5 rounded-full bg-primary text-primary-content flex items-center justify-center text-xs font-bold">
                            ✓
                          </div>
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

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
