"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { TabButtonProps } from "./ForumCarousel";
import { FC } from "react";
import { cn } from "~/lib/utils";

const TabButton: FC<TabButtonProps> = ({ tab, index, isActive, onClick }) => {
  const Icon = tab.icon;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={onClick}
            className={cn(
              "flex flex-1 items-center justify-center gap-2 py-2 transition-colors",
              "whitespace-nowrap rounded-t-lg text-sm font-medium",
              isActive
                ? "border-t-2 border-blue-600 bg-white text-blue-600 dark:border-blue-400 dark:bg-gray-800 dark:text-blue-400"
                : "text-gray-600 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700",
            )}
          >
            <Icon className="h-5 w-5" />
            <span className="hidden sm:inline">{tab.title}</span>
          </button>
        </TooltipTrigger>
        <TooltipContent className="sm:hidden" side="bottom">
          {tab.title}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TabButton;
