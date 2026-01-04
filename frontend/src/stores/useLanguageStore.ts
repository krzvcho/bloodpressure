import { create } from "zustand";

type Locale = "en" | "de";
type Direction = "ltr" | "rtl";

type LanguageStore = {
  locale: Locale;
  direction: Direction;
  changeLocale: (newLocale: Locale) => void;
  setDirection: (dir: Direction) => void;
};

export const useLanguageStore = create<LanguageStore>()((set) => ({
  locale: "en",
  direction: "ltr",
  changeLocale: (newLocale: Locale) => {
    console.log("Changing locale to:", newLocale);
    set({ locale: newLocale });
  },
  setDirection: (dir: Direction) => {
    console.log("Changing direction to:", dir);
    set({ direction: dir });
  },
}));
