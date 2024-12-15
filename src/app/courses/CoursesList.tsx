"use client";

import Link from "next/link";
import { useLanguage } from "../providers";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "~/app/components/Card";
import { InferSelectModel } from "drizzle-orm";
import { courses } from "~/server/db/courses";

type Course = InferSelectModel<typeof courses>;

interface CoursesListProps {
  courses: Course[];
}

export default function CoursesList({ courses }: CoursesListProps) {
  const { lang, isHeb, t } = useLanguage();

  return (
    <div dir={isHeb ? "rtl" : "ltr"}>
      <div className="grid gap-4">
        {courses.map((course) => {
          const title = lang === "en" ? course.titleEn : course.titleHe;
          const desc =
            lang === "en" ? course.descriptionEn : course.descriptionHe;

          return (
            <Link
              key={course.id}
              href={`/courses/${course.id}?lang=${lang}`}
              className="block"
            >
              <Card className="transition-colors duration-300 hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600">
                <CardHeader>
                  <CardTitle className="flex justify-between">
                    <span>{title}</span>
                    <span className="text-sm text-gray-500">{course.id}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-2">{desc}</p>
                  <span className="text-blue-500 hover:underline">
                    {t.viewCourse}
                  </span>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
