import { db } from "~/server/db";
import { courses } from "~/server/db/schema";
import CoursesList from "./CoursesList";
import { serverDetLang } from "../utils/language";

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: { lang?: string };
}) {
  // Fetch courses from the DB
  const allCourses = await db.select().from(courses);
  const { t, lang } = await serverDetLang(searchParams);
  console.log({ lang });

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-4 text-center text-3xl font-bold">{t.courses}</h1>
      <CoursesList courses={allCourses} />
    </main>
  );
}
