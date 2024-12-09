// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import {sql} from 'drizzle-orm';
import {index, integer, pgTableCreator, text, timestamp, varchar,} from 'drizzle-orm/pg-core';

/**
 * This is an example of how to use the multi-project schema feature of Drizzle
 * ORM. Use the same database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `forum_${name}`);

export const posts = createTable(
    'post', {
      id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
      name: varchar('name', {length: 256}),
      createdAt: timestamp('created_at', {withTimezone: true})
                     .default(sql`CURRENT_TIMESTAMP`)
                     .notNull(),
      updatedAt: timestamp('updated_at', {
                   withTimezone: true
                 }).$onUpdate(() => new Date()),
    },
    (example) => ({
      nameIndex: index('name_idx').on(example.name),
    }));


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

    },
    (course) => ({
      titleIndexEn: index('course_title_en_idx').on(course.titleEn),
      titleIndexHe: index('course_title_he_idx').on(course.titleHe),
    }));