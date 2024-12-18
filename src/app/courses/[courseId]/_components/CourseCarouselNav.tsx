import { type FC } from "react";
import { type TabItem } from "./types";
import TabButton from "./TabButton";
import { cn } from "~/lib/utils";

interface CarouselNavProps {
  tabs: TabItem[];
  activeTab: number;
  handleTabClick: (index: number) => void;
  className?: string;
}

const CourseCarouselNav: FC<CarouselNavProps> = ({
  activeTab,
  handleTabClick,
  tabs,
  className,
}) => {
  return (
    <nav
      className={cn(
        "flex w-full",
        "border-b border-gray-200 dark:border-gray-700",
        "bg-gray-100 dark:bg-gray-900",
        "px-4",
        className,
      )}
    >
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
