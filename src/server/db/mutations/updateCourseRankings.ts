import {InferInsertModel, sql} from 'drizzle-orm';
import {eq} from 'drizzle-orm/expressions';
import {courseRankings, courses, type DbClient} from '../index';
type CourseRating = InferInsertModel<typeof courseRankings>;

export async function updateCourseRankings(
    db: DbClient, newRating: CourseRating) {
  return await db.transaction(async (tx) => {
    const {
      courseId,
      userId,
      grade,  // Individual student's grade
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

    // Update course averages and overall score
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
          overallScore: sql`(
          SELECT 
            (AVG(NULLIF(grade, 0)) * 0.4) + 
            (AVG(NULLIF(interest_level, 0)) * 0.3) + 
            ((10 - AVG(NULLIF(exam_difficulty, 0))) * 0.15) + 
            ((10 - AVG(NULLIF(assignment_difficulty, 0))) * 0.15)
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
        overallScore: true,
      },
    });
  });
}