"use client";

import { ThemeProvider } from "next-themes";
import { createContext, useContext, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import type { ReactNode } from "react";

type Language = "en" | "he";

export function Providers({ children }: { children: ReactNode }) {
  // Use the search parameters to determine the current language
  const searchParams = useSearchParams();
  const language = (searchParams.get("lang") as Language) || "en";

  // Memoize the derived value to avoid unnecessary re-renders
  const isHebrew = useMemo(() => language === "he", [language]);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}
