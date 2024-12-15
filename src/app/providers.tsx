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
  langParam: string;
}>({
  lang: "en",
  isHeb: false,
  t: xTrans.en,
  langParam: "",
});

export function useLanguage() {
  return useContext(LanguageContext);
}

export function Providers({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();
  const lang = (searchParams.get("lang") as Language) || "he";
  const isHeb = useMemo(() => lang === "he", [lang]);
  const t = useMemo(() => (isHeb ? xTrans.he : xTrans.en), [isHeb]);
  const langParam = useMemo(() => (isHeb ? "" : "?lang=en"), [isHeb]);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Suspense fallback={<div>Loading...</div>}>
        <LanguageContext.Provider value={{ lang, isHeb, t, langParam }}>
          {children}
        </LanguageContext.Provider>
      </Suspense>
    </ThemeProvider>
  );
}
