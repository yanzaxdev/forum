"use client";

import { FC } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { useLanguage } from "~/app/providers";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";
import { Badge } from "./ui/badge";

type Props = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const ForumSheet: FC<Props> = ({ open, onOpenChange }) => {
  const { isHeb, setLanguage, t, langParam } = useLanguage();
  const router = useRouter();

  const handleLanguageToggle = () => {
    const newLang = isHeb ? "en" : "he";
    setLanguage(newLang);

    const currentUrl = new URL(window.location.href);
    const searchParams = new URLSearchParams(currentUrl.search);

    if (newLang === "he") searchParams.delete("lang");
    else searchParams.set("lang", newLang);

    router.push(`${currentUrl.pathname}?${searchParams.toString()}`);
  };

  return (
    <SheetContent
      dir={t._dir}
      side={isHeb ? "right" : "left"}
      className="fixed w-full border-l-0 p-0 sm:w-[300px] sm:border-l"
    >
      {/* Container for flex layout */}
      <div className="flex h-full flex-col">
        {/* Header Section */}
        <div className="px-6 py-4">
          <SheetHeader>
            <SheetTitle className="text-center">{t.menu}</SheetTitle>
          </SheetHeader>
        </div>

        {/* Scrollable Content */}
        <div className="grid overflow-y-auto px-6">
          <Badge className="bg-gray-600">{t.courses}</Badge>
          <Link
            href={`/courses${langParam}`}
            className="hover:underline"
          ></Link>
        </div>

        {/* Footer Section */}
        <div className="mt-auto border-t px-6 py-4">
          <SheetFooter className="sm:flex-row">
            <Button
              onClick={handleLanguageToggle}
              className="w-full border border-gray-300 hover:bg-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
            >
              {t._self}
            </Button>
          </SheetFooter>
        </div>
      </div>
    </SheetContent>
  );
};

export default ForumSheet;
