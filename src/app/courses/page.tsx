import { db } from "~/server/db";
import { courses } from "~/server/db";
import { serverDetLang } from "../utils/language";
import CourseCard from "../components/CourseCard";

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: { lang?: string };
}) {
  // Fetch courses from the DB
  const allCourses = await db.select().from(courses);
  const { t, lang, isHeb } = await serverDetLang(searchParams);

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      {allCourses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </main>
  );
}
