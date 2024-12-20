// src/db.ts
import {sql} from '@vercel/postgres';
import {drizzle,} from 'drizzle-orm/vercel-postgres';

import * as schema from './schema';

export * from './schema';
export const db = drizzle(sql, {schema});
export type DbClient = typeof db;