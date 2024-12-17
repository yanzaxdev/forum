"use client";

import { type FC } from "react";
import { Carousel } from "~/components/ui/carousel";
import { cn } from "~/lib/utils";
import { DEFAULT_TABS, type TabbedContentProps } from "./types";
import { useTabs } from "../useTabs";
import TabButton from "./TabButton";
import CourseCarouselNav from "./CourseCarouselNav";
import CourseCarouselContent from "./CourseCarouselContent";

const CourseCarousel: FC<TabbedContentProps> = ({ course, className }) => {
  const { activeTab, setApi, skipAnimation, handleTabClick, api } =
    useTabs(DEFAULT_TABS);

  const handleContentClick = () => {
    if (!api) return;
    // Calculate next index directly from activeTab number
    const nextIndex = (activeTab + 1) % DEFAULT_TABS.length;
    // Pass the index number to handleTabClick
    handleTabClick(nextIndex);
  };

  return (
    <section className={cn("flex min-h-0 flex-1 flex-col", className)}>
      <CourseCarouselNav
        tabs={DEFAULT_TABS}
        activeTab={activeTab}
        handleTabClick={handleTabClick}
      />

      <Carousel
        className="flex-grow bg-white dark:bg-gray-800"
        setApi={setApi}
        opts={{
          align: "start",
          loop: false,
          skipSnaps: skipAnimation,
          duration: skipAnimation ? 0 : undefined,
        }}
      >
        <CourseCarouselContent onContentClick={handleContentClick} />
      </Carousel>
    </section>
  );
};

export default CourseCarousel;
