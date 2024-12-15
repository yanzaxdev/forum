"use client";

import { ThemeProvider } from "next-themes";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { xTrans } from "~/translations";

type Language = "en" | "he";

interface LanguageContextType {
  lang: Language;
  isHeb: boolean;
  t: typeof xTrans.en | typeof xTrans.he;
  langParam: string;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  isHeb: false,
  t: xTrans.en,
  langParam: "",
  setLanguage: () => {},
});

export function useLanguage() {
  return useContext(LanguageContext);
}

export function Providers({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState<Language>("en");

  useEffect(() => {
    const storedLang = (localStorage.getItem("language") as Language) || "en";
    setLang(storedLang);
    setMounted(true);
  }, []);

  const setLanguage = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem("language", newLang);
  };

  if (!mounted) return null;

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <LanguageContext.Provider
        value={{
          lang,
          isHeb: lang === "he",
          t: lang === "he" ? xTrans.he : xTrans.en,
          langParam: lang === "he" ? "" : "?lang=en",
          setLanguage,
        }}
      >
        {children}
      </LanguageContext.Provider>
    </ThemeProvider>
  );
}

// Wrapper component to ensure providers are applied
export function AppWrapper({ children }: { children: ReactNode }) {
  return (
    <Providers>
      <ThemeWrapper>{children}</ThemeWrapper>
    </Providers>
  );
}

// Separate theme wrapper if needed
function ThemeWrapper({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
