import {sql} from 'drizzle-orm';
import {decimal, index, integer, pgTableCreator, text, timestamp, varchar,} from 'drizzle-orm/pg-core';

import {createTable} from './tableCreator';


export const courses = createTable(
    'course', {
      id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
      titleEn: varchar('title_en', {length: 256}).notNull(),
      titleHe: varchar('title_he', {length: 256}).notNull(),
      descriptionEn: text('description_en').notNull(),
      descriptionHe: text('description_he').notNull(),
      createdAt: timestamp('created_at', {withTimezone: true})
                     .default(sql`CURRENT_TIMESTAMP`)
                     .notNull(),

      courseNumber: varchar('course_number', {length: 50})
                        .notNull()
                        .default('00000')
                        .unique(),
      level: varchar('level', {length: 50}).notNull().default('beginner'),
      creditPoints: decimal('credit_points', {precision: 4, scale: 2})
                        .notNull()
                        .default(sql`0`),
      department: varchar('department', {length: 256}),

      // Corrected default values
      gradeAverage:
          decimal('grade_average', {precision: 5, scale: 2}).default(sql`0`),
      examDifficulty:
          decimal('exam_difficulty', {precision: 3, scale: 2}).default(sql`0`),
      assignmentDifficulty:
          decimal('assignment_difficulty', {precision: 3, scale: 2})
              .default(sql`0`),
      interestLevel:
          decimal('interest_level', {precision: 3, scale: 2}).default(sql`0`),
    },
    (course) => ({
      titleIndexEn: index('course_title_en_idx').on(course.titleEn),
      titleIndexHe: index('course_title_he_idx').on(course.titleHe),
      courseNumberIndex: index('course_number_idx').on(course.courseNumber),
      departmentIndex: index('course_department_idx').on(course.department),
    }));