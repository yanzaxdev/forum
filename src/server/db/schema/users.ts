import {sql} from 'drizzle-orm';
import {decimal, index, integer, pgTableCreator, text, timestamp, varchar,} from 'drizzle-orm/pg-core';

import {createTable} from './tableCreator';


export const users = createTable(
    'users', {
      id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
      username: varchar('username', {length: 50}).notNull().unique(),
      email: varchar('email', {length: 256}).notNull().unique(),
      createdAt: timestamp('created_at', {withTimezone: true})
                     .default(sql`CURRENT_TIMESTAMP`)
                     .notNull(),
    },
    (user) => ({
      usernameIndex: index('username_idx').on(user.username),
      emailIndex: index('email_idx').on(user.email),
    }));
