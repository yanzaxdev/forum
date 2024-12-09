"use client";

import { ThemeProvider } from "next-themes";
import { createContext, useState, useContext } from "react";
import type { ReactNode } from "react";

type Language = "en" | "he";

// Create a Language context
const LanguageContext = createContext<{
  language: Language;
  toggleLanguage: () => void;
}>({
  language: "en",
  toggleLanguage: () => {
    console.warn("toggleLanguage function is not implemented");
  },
});

export function useLanguage() {
  return useContext(LanguageContext);
}

export function Providers({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "he" : "en"));
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <LanguageContext.Provider value={{ language, toggleLanguage }}>
        {children}
      </LanguageContext.Provider>
    </ThemeProvider>
  );
}
