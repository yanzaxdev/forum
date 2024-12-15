import {InferInsertModel} from 'drizzle-orm';
import {db} from '~/server/db';
import {courses} from '~/server/db/schema';

export type courseType = InferInsertModel<typeof courses>;

export async function popScript() {
  // const newCourses: courseType[] = [
  //   {
  //     id: 20474,
  //     titleEn: 'Calculus 1',
  //     titleHe: 'חשבון אינפיניטסימלי 1',
  //     descriptionEn: 'An introductory course on calculus.',
  //     descriptionHe: 'קורס מבוא בחשבון אינפיניטסימלי.',
  //     level: 'regular',
  //     creditPoints: '7',
  //     department: 'Mathematics',
  //     createdAt: new Date(),
  //     courseNumber: '20474',
  //   },

  // ];

  // const res = await db.insert(courses).values(newCourses).execute();
  // return res;
  return undefined
}