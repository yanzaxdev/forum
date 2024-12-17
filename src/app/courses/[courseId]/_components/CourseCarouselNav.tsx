// CarouselNav.tsx
import { type FC } from "react";
import { CarouselContent, CarouselItem } from "~/components/ui/carousel";
import { DEFAULT_TABS, TabItem } from "./types";
import exp from "constants";
import TabButton from "./TabButton";

interface CarouselNavProps {
  tabs: TabItem[];
  activeTab: number;
  handleTabClick: (index: number) => void;
}

const CourseCarouselNav: FC<CarouselNavProps> = ({
  activeTab,
  handleTabClick,
  tabs,
}) => {
  return (
    <nav className="flex w-full border-b border-gray-200 bg-gray-100 px-4 dark:border-gray-700 dark:bg-gray-900">
      {tabs.map((tab, index) => (
        <TabButton
          key={tab.id}
          tab={tab}
          index={index}
          isActive={activeTab === index}
          onClick={() => handleTabClick(index)}
        />
      ))}
    </nav>
  );
};

export default CourseCarouselNav;
