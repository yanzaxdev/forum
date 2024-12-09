import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/app/_components/Card";
import { db } from "~/server/db"; // db should be your Drizzle db instance
import { courses } from "~/server/db/schema";

type CourseProps = {
  params: { courseId: string };
  searchParams?: { lang?: "en" | "he" };
};

// This is a server component now, no `use client` at the top
export default async function CoursePage({
  params,
  searchParams,
}: CourseProps) {
  const courseIdNum = parseInt(params.courseId, 10);
  if (isNaN(courseIdNum)) {
    notFound();
  }

  // Fetch the course from the DB
  const [course] = await db
    .select()
    .from(courses)
    .where(eq(courses.id, courseIdNum))
    .limit(1);

  if (!course) {
    notFound();
  }

  // Determine language from searchParams or default to English
  const language = searchParams?.lang === "he" ? "he" : "en";

  const title = language === "en" ? course.titleEn : course.titleHe;
  const description =
    language === "en" ? course.descriptionEn : course.descriptionHe;

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">{description}</p>
          <section className="mb-6">
            <h2 className="mb-2 text-xl font-semibold">
              {language === "en" ? "Comments" : "תגובות"}
            </h2>
            <p>
              {language === "en"
                ? "No comments yet. Be the first to share your thoughts!"
                : "אין עדיין תגובות. היה הראשון לשתף את מחשבותיך!"}
            </p>
          </section>
          <section>
            <h2 className="mb-2 text-xl font-semibold">
              {language === "en" ? "Leave a Comment" : "השאר תגובה"}
            </h2>
            {/* Replace this with a proper comment form later */}
            <button className="rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 focus:outline-none">
              {language === "en" ? "Add Comment" : "הוסף תגובה"}
            </button>
          </section>
        </CardContent>
      </Card>
    </main>
  );
}
