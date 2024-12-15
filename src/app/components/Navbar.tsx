"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Button } from "~/app/components/Button";
import { Sun, Moon } from "lucide-react";
import { xTrans } from "~/translations";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "../providers";

export default function NavBar() {
  const { theme, setTheme } = useTheme();
  const { isHeb, lang, t } = useLanguage();

  return (
    <nav
      dir={isHeb ? "rtl" : "ltr"} // Corrected direction logic
      className="bg-background flex items-center justify-between border-b px-4 py-2"
    >
      {/* Navigation Links */}
      <div className="flex items-center gap-2">
        <Link href={`/?lang=${lang}`}>
          <span className="text-xl font-bold hover:underline">
            {t.openUniForum}
          </span>
        </Link>
        <Link href={`/courses?lang=${lang}`} className="hover:underline">
          {t.courses}
        </Link>
      </div>
      <div className="flex items-center gap-4">
        {/* Toggle Language Button */}
        <Button
          onClick={() => {
            // Handle language toggle by changing the URL
            const newLang = isHeb ? "en" : "he";
            const searchParams = new URLSearchParams(window.location.search);
            searchParams.set("lang", newLang);
            window.location.search = searchParams.toString(); // Refresh the page with the new language
          }}
          className="border border-gray-300 hover:bg-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
        >
          {isHeb ? "English" : "עברית"}
        </Button>

        {/* Toggle Theme Button */}
        <Button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle theme"
          className="!bg-transparent !text-current hover:!bg-gray-200 dark:hover:!bg-gray-700"
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
      </div>
    </nav>
  );
}
