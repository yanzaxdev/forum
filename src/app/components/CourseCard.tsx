"use client";

import { FC, useState, useEffect, useContext } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./Card";
import { InferSelectModel } from "drizzle-orm";
import { courses } from "~/server/db/schema/courses";
import { useLanguage } from "../providers";
import { useRouter } from "next/navigation";
import { Badge, Star } from "lucide-react";
type Props = {
  course: InferSelectModel<typeof courses>;
};

const CourseCard: FC<Props> = ({ course }) => {
  /* ----- Context -----*/
  const { lang, isHeb, t, langParam } = useLanguage();

  /* ----- Variables -----*/
  const title = lang === "en" ? course.titleEn : course.titleHe;
  const desc = lang === "en" ? course.descriptionEn : course.descriptionHe;
  const router = useRouter();
  // Format score to one decimal place and handle undefined/null
  const formattedScore = course.overallScore
    ? Number(course.overallScore).toFixed(1)
    : "N/A";

  /* ----- Functions -----*/
  const onClick = () => router.push(`/courses/${course.id}${langParam}`);
  // Get color based on score
  const getScoreColor = (score: string | null | undefined) => {
    if (!score) return "bg-gray-200 text-gray-700";
    if (Number(score) >= 8) return "bg-green-100 text-green-800";
    if (Number(score) >= 6) return "bg-blue-100 text-blue-800";
    return "bg-orange-100 text-orange-800";
  };

  /* ----- Return -----*/
  return (
    <Card
      dir={`${isHeb ? "rtl" : "ltr"}`}
      onClick={onClick}
      className="my-2 transition-colors duration-300 hover:cursor-pointer hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-600"
    >
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span>{title}</span>
          </div>
          <Badge
            className={`flex items-center gap-1 px-2 py-1 ${getScoreColor(course.overallScore)}`}
          >
            {formattedScore}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-2">{desc}</p>
        <span className="text-sm text-gray-500">{course.id}</span>
        <div className="flex items-center justify-between">
          {course.overallScore && (
            <div className="text-sm text-gray-500">
              {t.outOf ? `${formattedScore}/10` : `Score: ${formattedScore}/10`}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
