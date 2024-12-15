"use client";

import { ThemeProvider } from "next-themes";
import { createContext, useContext, useMemo, ReactNode, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { xTrans } from "~/translations";

type Language = "en" | "he";

const LanguageContext = createContext<{
  lang: Language;
  isHeb: boolean;
  t: typeof xTrans.en | typeof xTrans.he;
}>({
  lang: "en",
  isHeb: false,
  t: xTrans.en,
});

export function useLanguage() {
  return useContext(LanguageContext);
}

export function Providers({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();
  const language = (searchParams.get("lang") as Language) || "he";

  // Memoize the derived value to avoid unnecessary re-renders
  const isHebrew = useMemo(() => language === "he", [language]);
  const t = useMemo(() => (isHebrew ? xTrans.he : xTrans.en), [isHebrew]);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <LanguageContext.Provider value={{ lang: language, isHeb: isHebrew, t }}>
        {children}
      </LanguageContext.Provider>
    </ThemeProvider>
  );
}
