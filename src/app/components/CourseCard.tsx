"use client";

import { FC, useState, useEffect, useContext } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./Card";
import { InferSelectModel } from "drizzle-orm";
import { courses } from "~/server/db/schema/courses";
import { useLanguage } from "../providers";
import { useRouter } from "next/navigation";
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

  /* ----- Functions -----*/
  const onClick = () => router.push(`/courses/${course.id}${langParam}`);

  /* ----- Return -----*/
  return (
    <Card
      dir={`${isHeb ? "rtl" : "ltr"}`}
      onClick={onClick}
      className="my-2 transition-colors duration-300 hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
    >
      <CardHeader>
        <CardTitle className="flex justify-between">
          <span>{title}</span>
          <span className="text-sm text-gray-500">{course.id}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-2">{desc}</p>
        <span className="text-blue-500 hover:underline">{t.viewCourse}</span>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
