// src/stores/darkModeStore.ts
import { create } from "zustand";
import Cookies from "js-cookie";

interface DarkModeState {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const useDarkModeStore = create<DarkModeState>((set) => {
  const initialDarkMode = Cookies.get("darkMode") === "true";

  return {
    darkMode: initialDarkMode,
    toggleDarkMode: () =>
      set((state) => {
        const newDarkMode = !state.darkMode;
        Cookies.set("darkMode", newDarkMode.toString(), { expires: 7 });
        document.documentElement.classList.toggle("dark", newDarkMode);
        return { darkMode: newDarkMode };
      }),
  };
});
