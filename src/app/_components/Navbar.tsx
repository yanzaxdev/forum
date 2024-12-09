"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useLanguage } from "~/app/providers";
import { Button } from "~/app/_components/Button";
import { Sun, Moon } from "lucide-react";

export default function NavBar() {
  const { theme, setTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const isHebrew = language === "he";

  return (
    <nav
      dir={isHebrew ? "rtl" : "ltr"}
      className="bg-background flex items-center justify-between border-b px-4 py-2"
    >
      <div className="flex items-center gap-4">
        {isHebrew ? (
          <>
            <Button
              onClick={toggleLanguage}
              className="border border-gray-300 hover:bg-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
            >
              {isHebrew ? "English" : "עברית"}
            </Button>
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
          </>
        ) : (
          <>
            <Link href="/">
              <span className="text-xl font-bold hover:underline">
                Open Uni Forum
              </span>
            </Link>
            <Link href="/courses" className="hover:underline">
              Courses
            </Link>
          </>
        )}
      </div>
      <div className="flex items-center gap-2">
        {isHebrew ? (
          <>
            <Link href="/">
              <span className="text-xl font-bold hover:underline">
                פורום האוניברסיטה הפתוחה
              </span>
            </Link>
            <Link href="/courses" className="hover:underline">
              קורסים
            </Link>
          </>
        ) : (
          <>
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
            <Button
              onClick={toggleLanguage}
              className="border border-gray-300 hover:bg-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
            >
              {isHebrew ? "English" : "עברית"}
            </Button>
          </>
        )}
      </div>
    </nav>
  );
}
