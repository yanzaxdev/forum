// CarouselNav.tsx
import { type FC } from "react";
import { CarouselContent, CarouselItem } from "~/components/ui/carousel";
import { TabItem } from "./types";
import exp from "constants";

interface CarouselNavProps {
  tabs: TabItem[];
}

const CarouselNav: FC<CarouselNavProps> = ({ tabs }) => {
  return (
    <CarouselContent>
      {tabs.map((tab) => (
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
  );
};

export default CarouselNav;
