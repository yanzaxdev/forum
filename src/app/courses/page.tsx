import { db } from "~/server/db";
import { courses } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import CoursesList from "./CoursesList";

export const dynamic = "force-dynamic"; // if needed for SSR

export default async function CoursesPage() {
  // Fetch courses from the DB
  const allCourses = await db.select().from(courses);

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      {/* Pass fetched courses to the client component */}
      <CoursesList courses={allCourses} />
    </main>
  );
}
