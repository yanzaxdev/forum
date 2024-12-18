import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { courses } from "~/server/db";
import { SearchParams } from "next/dist/server/request/search-params";
import { serverDetLang } from "~/utils/language";

import CourseCarousel from "./_components/CourseCarousel";

type CourseProps = {
  params: { courseId: string };
  searchParams?: SearchParams;
};

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
      <CourseCarousel course={course} className="flex-1" />
    </main>
  );
}
