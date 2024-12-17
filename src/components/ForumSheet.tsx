"use client";

import { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "~/app/providers";
import { cn } from "~/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface ForumSheetProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const ForumSheet: FC<ForumSheetProps> = ({ open, onOpenChange }) => {
  const router = useRouter();
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

  return (
    <SheetContent
      dir={t._dir}
      side={isHeb ? "right" : "left"}
      className={cn("fixed w-full border-l-0 p-0", "sm:w-[300px] sm:border-l")}
    >
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="border-b px-6 py-4">
          <SheetHeader>
            <SheetTitle className="text-center text-lg font-semibold">
              {t.menu}
            </SheetTitle>
          </SheetHeader>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-4 overflow-y-auto px-6 py-4">
          <div className="space-y-2">
            <Badge
              className={cn(
                "mb-2 w-full justify-center",
                "bg-gray-600 text-white",
                "dark:bg-gray-700",
              )}
            >
              {t.courses}
            </Badge>
            <Link
              href={`/courses${langParam}`}
              className={cn(
                "block w-full rounded-md px-3 py-2",
                "text-sm text-gray-700 hover:bg-gray-100",
                "dark:text-gray-300 dark:hover:bg-gray-800",
                "transition-colors duration-200",
              )}
            >
              {t.courses}
            </Link>
          </div>
        </nav>

        {/* Footer */}
        <div className="border-t px-6 py-4">
          <SheetFooter className="sm:flex-row">
            <Button
              onClick={handleLanguageToggle}
              variant="outline"
              className={cn(
                "w-full",
                "border-gray-300 hover:bg-gray-200",
                "dark:border-gray-600 dark:hover:bg-gray-700",
                "transition-colors duration-200",
              )}
            >
              {t._opposite}
            </Button>
          </SheetFooter>
        </div>
      </div>
    </SheetContent>
  );
};

export default ForumSheet;
