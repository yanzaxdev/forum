// CourseCarouselContent.tsx
"use client";

import { FC } from "react";
import { CarouselContent, CarouselItem } from "~/components/ui/carousel";
import { DEFAULT_TABS } from "./types";

interface CourseCarouselContentProps {
  onContentClick?: () => void;
}

const CourseCarouselContent: FC<CourseCarouselContentProps> = ({
  onContentClick,
}) => {
  return (
    <CarouselContent className="cursor-pointer" onClick={onContentClick}>
      {DEFAULT_TABS.map((tab) => (
        <CarouselItem key={tab.id}>
          <article className="prose dark:prose-invert flex h-full max-w-none flex-col p-6">
            <h2 className="mb-4 flex-none text-2xl font-bold text-gray-900 dark:text-white">
              {tab.title}
            </h2>
            <div className="flex-1 overflow-auto text-gray-600 dark:text-gray-300">
              {tab.content}
            </div>
          </article>
        </CarouselItem>
      ))}
    </CarouselContent>
  );
};

export default CourseCarouselContent;
