import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("pk-verse-theme") || "abyss",
  setTheme: (theme) => {
    localStorage.setItem("pk-verse-theme", theme);
    set({ theme });
  },
}));
