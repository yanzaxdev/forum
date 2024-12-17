"use client";

import { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Sun, Moon, House, Menu } from "lucide-react";
import { cn } from "~/lib/utils";
import { useLanguage } from "~/app/providers";
import { Button } from "./ui/button";
import { SheetTrigger } from "./ui/sheet";

const NavBar: FC = () => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { isHeb, setLanguage, t, langParam } = useLanguage();

  const handleLanguageToggle = () => {
    const newLang = isHeb ? "en" : "he";
    setLanguage(newLang);

    const currentUrl = new URL(window.location.href);
    const searchParams = new URLSearchParams(currentUrl.search);

    if (newLang === "he") {
      searchParams.delete("lang");
    } else {
      searchParams.set("lang", newLang);
    }

    router.push(`${currentUrl.pathname}?${searchParams.toString()}`);
  };

  const handleThemeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav
      dir={isHeb ? "rtl" : "ltr"}
      className={cn(
        "sticky top-0 z-50",
        "flex h-16 items-center justify-between",
        "border-b bg-gray-100 px-4",
        "dark:bg-black",
        "transition-colors duration-200",
      )}
    >
      {/* Left Section: Navigation */}
      <div className="flex items-center gap-4">
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn("hover:bg-gray-200", "dark:hover:bg-gray-800")}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Open menu</span>
          </Button>
        </SheetTrigger>

        <Link
          href={`/${langParam}`}
          className={cn(
            "flex items-center gap-2",
            "rounded-md p-2",
            "hover:bg-gray-200",
            "dark:hover:bg-gray-800",
            "transition-colors duration-200",
          )}
        >
          <House className="h-5 w-5" />
          <span className="sr-only">Home</span>
        </Link>

        <Link
          href={`/courses${langParam}`}
          className={cn(
            "rounded-md p-2 text-sm font-medium",
            "hover:bg-gray-200",
            "dark:hover:bg-gray-800",
            "transition-colors duration-200",
          )}
        >
          {t.courses}
        </Link>
      </div>

      {/* Right Section: Theme Toggle */}
      <div className="flex items-center gap-4">
        <Button
          onClick={handleThemeToggle}
          variant="ghost"
          size="icon"
          className={cn("hover:bg-gray-200", "dark:hover:bg-gray-800")}
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </nav>
  );
};

export default NavBar;
