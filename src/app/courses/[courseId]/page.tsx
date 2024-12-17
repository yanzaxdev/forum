import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/Card";
import { db } from "~/server/db"; // db should be your Drizzle db instance
import { courses } from "~/server/db";
import { SearchParams } from "next/dist/server/request/search-params";
import { serverDetLang } from "~/utils/language";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import TabbedContent from "~/app/courses/[courseId]/_components/ForumCarousel";

type CourseProps = {
  params: { courseId: string };
  searchParams?: SearchParams;
};

// This is a server component now, no `use client` at the top
export default async function CoursePage({
  params,
  searchParams,
}: CourseProps) {
  const { isHeb, lang, t } = await serverDetLang(searchParams);
  const p = await params;
  const courseIdNum = parseInt(p.courseId, 10);
  if (isNaN(courseIdNum)) notFound();

  // Fetch the course from the DB
  const [course] = await db
    .select()
    .from(courses)
    .where(eq(courses.id, courseIdNum))
    .limit(1);

  if (!course) notFound();

  return (
    <main className="flex flex-1 flex-col py-1" dir={t._dir}>
      <TabbedContent course={course} />
    </main>
  );
}
