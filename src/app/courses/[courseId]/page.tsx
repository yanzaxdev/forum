import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/app/components/Card";
import { db } from "~/server/db"; // db should be your Drizzle db instance
import { courses } from "~/server/db";
import { SearchParams } from "next/dist/server/request/search-params";
import { serverDetLang } from "~/app/utils/language";

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

  const title = isHeb ? course.titleHe : course.titleEn;
  const description = isHeb ? course.descriptionHe : course.descriptionEn;

  return (
    <main className="mx-auto max-w-3xl px-4 py-8" dir={isHeb ? "rtl" : "ltr"}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">{description}</p>
          <section className="mb-6">
            <h2 className="mb-2 text-xl font-semibold">{t.comments}</h2>
            <p>{t.noComments}</p>
          </section>
          <section>
            <h2 className="mb-2 text-xl font-semibold">{t.leaveComment}</h2>
            {/* Replace this with a proper comment form later */}
            <button className="rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 focus:outline-none">
              {t.addComment}
            </button>
          </section>
        </CardContent>
      </Card>
    </main>
  );
}
