import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("pk-verse-theme") || "halloween",
  setTheme: (theme) => {
    localStorage.setItem("pk-verse-theme", theme);
    set({ theme });
  },
}));
