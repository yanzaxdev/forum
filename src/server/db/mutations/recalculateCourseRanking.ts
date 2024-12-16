import {sql} from 'drizzle-orm';
import {eq} from 'drizzle-orm/expressions';
import {courses, courseRankings, type DbClient} from '../index';

export async function recalculateAllCourseRankings(db: DbClient) {
  try {
    // Get all unique course IDs from the rankings table
    const coursesWithRankings =
        await db.select({courseId: courseRankings.courseId})
            .from(courseRankings)
            .groupBy(courseRankings.courseId);

    // Update each course's averages
    for (const {courseId} of coursesWithRankings) {
      await db.update(courses)
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
    }

    return {
      success: true,
      message: `Updated rankings for ${coursesWithRankings.length} courses`,
      coursesUpdated: coursesWithRankings.length,
    };
  } catch (error) {
    console.error('Error recalculating course rankings:', error);
    throw error;
  }
}