"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import { InferSelectModel } from "drizzle-orm";
import { cn } from "~/lib/utils";
import { useLanguage } from "~/app/providers";
import { courses } from "~/server/db/schema/courses";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";
import { Badge } from "./ui/badge";

type CourseCardProps = {
  course: InferSelectModel<typeof courses>;
};

const CourseCard: FC<CourseCardProps> = ({ course }) => {
  const router = useRouter();
  const { lang, isHeb, langParam } = useLanguage();

  const title = lang === "en" ? course.titleEn : course.titleHe;
  const description =
    lang === "en" ? course.descriptionEn : course.descriptionHe;
  const formattedScore = course.overallScore
    ? Number(course.overallScore).toFixed(1)
    : "N/A";

  const scoreColorVariants = {
    default: "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200",
    high: "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100",
    medium: "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100",
    low: "bg-orange-100 text-orange-800 dark:bg-orange-800 dark:text-orange-100",
  };

  const getScoreColor = (score: string | null | undefined) => {
    if (!score) return scoreColorVariants.default;
    const numericScore = Number(score);
    if (numericScore >= 8) return scoreColorVariants.high;
    if (numericScore >= 6) return scoreColorVariants.medium;
    return scoreColorVariants.low;
  };

  const handleClick = () => router.push(`/courses/${course.id}${langParam}`);

  return (
    <Card
      dir={isHeb ? "rtl" : "ltr"}
      onClick={handleClick}
      className={cn(
        "my-2 transition-colors duration-300",
        "hover:cursor-pointer hover:bg-gray-100",
        "dark:bg-gray-900 dark:hover:bg-gray-600",
      )}
    >
      <CardHeader>
        <CardTitle>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span>{title}</span>
            </div>
            <div className="flex gap-3">
              <span className="py-1 text-sm text-gray-500">{course.id}</span>
              <Badge
                className={cn(
                  "flex items-center gap-1 px-2 py-1",
                  getScoreColor(course.overallScore),
                )}
              >
                {formattedScore}
              </Badge>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-2">{description}</p>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
