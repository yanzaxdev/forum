import {InferInsertModel, sql} from 'drizzle-orm';
import {and, eq} from 'drizzle-orm/expressions';

import {courseRankings, courses, DbClient} from '../index';



type CourseRating = InferInsertModel<typeof courseRankings>;

export async function updateCourseRankings(
    db: DbClient, newRating: CourseRating) {
  return await db.transaction(async (tx) => {
    const {
      courseId,
      userId,
      grade,
      examDifficulty,
      assignmentDifficulty,
      interestLevel
    } = newRating;

    // First, insert or update the user's rating
    await tx.insert(courseRankings)
        .values({
          courseId,
          userId,
          grade,
          examDifficulty,
          assignmentDifficulty,
          interestLevel,
        })
        .onConflictDoUpdate({
          target: [courseRankings.courseId, courseRankings.userId],
          set: {
            grade,
            examDifficulty,
            assignmentDifficulty,
            interestLevel,
            createdAt: sql`CURRENT_TIMESTAMP`,
          },
        });

    // Update course averages using all rankings
    await tx.update(courses)
        .set({
          gradeAverage: sql`(
          SELECT AVG(NULLIF(grade, 0))
          FROM ${courseRankings}
          WHERE course_id = ${courseId}
        )`,
          examDifficulty: sql`(
          SELECT AVG(NULLIF(exam_difficulty, 0))
          FROM ${courseRankings}
          WHERE course_id = ${courseId}
        )`,
          assignmentDifficulty: sql`(
          SELECT AVG(NULLIF(assignment_difficulty, 0))
          FROM ${courseRankings}
          WHERE course_id = ${courseId}
        )`,
          interestLevel: sql`(
          SELECT AVG(NULLIF(interest_level, 0))
          FROM ${courseRankings}
          WHERE course_id = ${courseId}
        )`,
        })
        .where(eq(courses.id, courseId));

    // Return the updated course data
    return await tx.query.courses.findFirst({
      where: eq(courses.id, courseId),
      columns: {
        id: true,
        titleEn: true,
        gradeAverage: true,
        examDifficulty: true,
        assignmentDifficulty: true,
        interestLevel: true,
      },
    });
  });
}

// Helper function to get course rankings for a specific course
export async function getCourseRankings(db: DbClient, courseId: number) {
  return await db.query.courseRankings.findMany({
    where: eq(courseRankings.courseId, courseId),
    columns: {
      userId: true,
      grade: true,
      examDifficulty: true,
      assignmentDifficulty: true,
      interestLevel: true,
      createdAt: true,
    },
    orderBy: (rankings) => rankings.createdAt,
  });
}

// Helper function to get a user's ranking for a specific course
export async function getUserCourseRanking(
    db: DbClient, courseId: number, userId: number) {
  return await db.query.courseRankings.findFirst({
    where:
        and(eq(courseRankings.courseId, courseId),
            eq(courseRankings.userId, userId)),
  });
}