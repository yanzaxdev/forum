"use client";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "~/app/components/Card";
import { useLanguage } from "../providers";
type DB_Course = {
  id: number;
  titleEn: string;
  titleHe: string;
  descriptionEn: string;
  descriptionHe: string;
  // ...other fields if you have them
};

interface CoursesListProps {
  courses: DB_Course[];
}

export default function CoursesList({ courses }: CoursesListProps) {
  const { lang, isHeb, t } = useLanguage();

  return (
    <div dir={isHeb ? "rtl" : "ltr"}>
      <h1 className="mb-4 text-3xl font-bold">{t.courses}</h1>
      <div className="grid gap-4">
        {courses.map((course) => {
          const title = lang === "en" ? course.titleEn : course.titleHe;
          const desc =
            lang === "en" ? course.descriptionEn : course.descriptionHe;

          return (
            <Card key={course.id}>
              <CardHeader>
                <CardTitle>{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-2">{desc}</p>
                <Link
                  href={`/courses/${course.id}`}
                  className="text-blue-500 hover:underline"
                >
                  {t.viewCourse}
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
