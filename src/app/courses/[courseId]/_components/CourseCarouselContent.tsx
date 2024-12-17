import { FC } from "react";
import { CarouselContent, CarouselItem } from "~/components/ui/carousel";
import { DEFAULT_TABS } from "./types";
import { useLanguage } from "~/app/providers";
import { cn } from "~/lib/utils";

interface CourseCarouselContentProps {
  onContentClick?: () => void;
  className?: string;
}

const CourseCarouselContent: FC<CourseCarouselContentProps> = ({
  onContentClick,
  className,
}) => {
  const { t } = useLanguage();

  return (
    <CarouselContent
      className={cn("h-full flex-1 cursor-pointer", className)}
      onClick={onContentClick}
    >
      {DEFAULT_TABS.map((tab) => (
        <CarouselItem key={tab.id}>
          <article
            className={cn(
              "prose dark:prose-invert",
              "flex h-full max-w-none flex-col",
              "p-6",
            )}
          >
            <h2
              className={cn(
                "mb-4 flex-none",
                "text-2xl font-bold",
                "text-gray-900 dark:text-white",
              )}
            >
              {t[tab.id as keyof typeof t]}
            </h2>
            <div
              className={cn(
                "flex-1 overflow-auto",
                "text-gray-600 dark:text-gray-300",
              )}
            >
              {t[tab.id as keyof typeof t]}
            </div>
          </article>
        </CarouselItem>
      ))}
    </CarouselContent>
  );
};

export default CourseCarouselContent;
