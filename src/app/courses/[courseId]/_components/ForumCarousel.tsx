"use client";

import { type FC } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "~/components/ui/carousel";
import { cn } from "~/lib/utils";

import { DEFAULT_TABS, TabItem, type TabbedContentProps } from "./types";
import { useTabs } from "../hooks";
import TabButton from "./TabButton";

export interface TabButtonProps {
  tab: TabItem;
  index: number;
  isActive: boolean;
  onClick: () => void;
}

const TabbedContent: FC<TabbedContentProps> = ({ course, className }) => {
  const { activeTab, setApi, skipAnimation, handleTabClick } =
    useTabs(DEFAULT_TABS);

  return (
    <section className={cn("flex min-h-0 flex-1 flex-col", className)}>
      <nav className="flex w-full border-b border-gray-200 bg-gray-100 px-4 dark:border-gray-700 dark:bg-gray-900">
        {DEFAULT_TABS.map((tab, index) => (
          <TabButton
            key={tab.id}
            tab={tab}
            index={index}
            isActive={activeTab === index}
            onClick={() => handleTabClick(index)}
          />
        ))}
      </nav>

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
        <CarouselContent>
          {DEFAULT_TABS.map((tab) => (
            <CarouselItem key={tab.id} className="h-full p-6">
              <article className="prose dark:prose-invert h-full max-w-none">
                <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                  {tab.title}
                </h2>
                <div className="text-gray-600 dark:text-gray-300">
                  {tab.content}
                </div>
              </article>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export default TabbedContent;
