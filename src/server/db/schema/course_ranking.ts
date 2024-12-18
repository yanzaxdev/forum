import {sql} from 'drizzle-orm';
import {decimal, index, integer, pgTableCreator, text, timestamp, unique, varchar,} from 'drizzle-orm/pg-core';

import {courses} from './courses';
import {createTable} from './tableCreator';
import {users} from './users';



export const courseRankings = createTable(
    'course_rankings', {
      id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
      courseId: integer('course_id').notNull().references(() => courses.id),
      userId: integer('user_id').notNull().references(() => users.id),
      grade: decimal('grade', {precision: 5, scale: 2}).default(sql`0`),
      examDifficulty:
          decimal('exam_difficulty', {precision: 3, scale: 2}).default(sql`0`),
      assignmentDifficulty:
          decimal('assignment_difficulty', {precision: 3, scale: 2})
              .default(sql`0`),
      interestLevel:
          decimal('interest_level', {precision: 3, scale: 2}).default(sql`0`),
      createdAt: timestamp('created_at', {withTimezone: true})
                     .default(sql`CURRENT_TIMESTAMP`)
                     .notNull(),

    },
    (ranking) => ({
      courseIdIndex: index('course_id_idx').on(ranking.courseId),
      userIdIndex: index('user_id_idx').on(ranking.userId),
      uniqueCourseUserRanking: unique('unique_course_user_ranking')
                                   .on(ranking.userId, ranking.courseId)
    }));