"use client";

import { ThemeProvider } from "next-themes";
import { createContext, useState, useContext, useMemo } from "react";
import type { ReactNode } from "react";

type Language = "en" | "he";

const LanguageContext = createContext<{
  lang: Language;
  isHeb: boolean;
  toggleLanguage: () => void;
}>({
  lang: "en",
  isHeb: false,
  toggleLanguage: () => {
    console.log("No provider found");
  },
});

export function useLanguage() {
  return useContext(LanguageContext);
}

export function Providers({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  // Use useMemo to derive isHebrew from language
  const isHebrew = useMemo(() => language === "he", [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "he" : "en"));
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <LanguageContext.Provider
        value={{ lang: language, isHeb: isHebrew, toggleLanguage }}
      >
        {children}
      </LanguageContext.Provider>
    </ThemeProvider>
  );
}
