"use client";

import { type FC } from "react";
import { useLanguage } from "~/app/providers";
import { Carousel } from "~/components/ui/carousel";
import { cn } from "~/lib/utils";
import { DEFAULT_TABS, type TabbedContentProps } from "./types";
import { useTabs } from "../useTabs";
import CourseCarouselNav from "./CourseCarouselNav";
import CourseCarouselContent from "./CourseCarouselContent";

const CourseCarousel: FC<TabbedContentProps> = ({ course, className }) => {
  const { t, isHeb } = useLanguage();
  const { activeTab, setApi, skipAnimation, handleTabClick, api } =
    useTabs(DEFAULT_TABS);

  const handleContentClick = () => {
    if (!api) return;
    const nextIndex = (activeTab + 1) % DEFAULT_TABS.length;
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
        className={cn(
          "flex flex-grow flex-col bg-white dark:bg-gray-800",
          isHeb && "direction-rtl",
        )}
        dir={isHeb ? "rtl" : "ltr"}
        setApi={setApi}
        opts={{
          align: "start",
          loop: false,
          skipSnaps: skipAnimation,
          duration: skipAnimation ? 0 : undefined,
          direction: isHeb ? "rtl" : "ltr", // Set carousel direction
        }}
      >
        <CourseCarouselContent onContentClick={handleContentClick} />
      </Carousel>
    </section>
  );
};

export default CourseCarousel;
