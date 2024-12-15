"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useTheme } from "next-themes";
import { Button } from "~/app/components/Button";
import { Sun, Moon } from "lucide-react";
import { useLanguage } from "../providers";

export default function NavBar() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { isHeb, lang, t, setLanguage } = useLanguage();

  return (
    <nav
      dir={isHeb ? "rtl" : "ltr"}
      className="bg-background flex items-center justify-between border-b px-4 py-2"
    >
      {/* Navigation Links */}
      <div className="flex items-center gap-2">
        <Link href={isHeb ? "/" : "/?lang=en"}>
          <span className="text-xl font-bold hover:underline">
            {t.openUniForum}
          </span>
        </Link>
        <Link
          href={isHeb ? "/courses" : "/courses?lang=en"}
          className="hover:underline"
        >
          {t.courses}
        </Link>
      </div>
      <div className="flex items-center gap-4">
        {/* Toggle Language Button */}
        <Button
          onClick={() => {
            const newLang = isHeb ? "en" : "he";
            setLanguage(newLang);
            router.push(`/?lang=${newLang}`);
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
