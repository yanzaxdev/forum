import {InferInsertModel} from 'drizzle-orm';
import {db} from '~/server/db';
import {courses} from '~/server/db/schema';

export type courseType = InferInsertModel<typeof courses>;

export async function popScript() {
  const newCourses: courseType[] = [
    {
      id: 20476,
      titleEn:
          'Discrete Mathematics: Set Theory, Combinatorics, and Graph Theory',
      titleHe: 'מתמטיקה בדידה: תורת הקבוצות, קומבינטוריקה ותורת הגרפים',
      descriptionEn:
          'A course on discrete mathematics covering set theory, combinatorics, and graph theory.',
      descriptionHe:
          'קורס במתמטיקה בדידה המכסה תורת הקבוצות, קומבינטוריקה ותורת הגרפים.',
      level: 'regular',
      creditPoints: '4',
      department: 'Mathematics',
      createdAt: new Date(),
      courseNumber: '20476',
    },
    {
      id: 20109,
      titleEn: 'Linear Algebra 1',
      titleHe: 'אלגברה לינארית 1',
      descriptionEn: 'An introductory course on linear algebra.',
      descriptionHe: 'קורס מבוא באלגברה לינארית.',
      level: 'regular',
      creditPoints: '7',
      department: 'Mathematics',
      createdAt: new Date(),
      courseNumber: '20109',
    },
    {
      id: 20229,
      titleEn: 'Linear Algebra 2',
      titleHe: 'אלגברה לינארית 2',
      descriptionEn: 'A continuation of Linear Algebra 1.',
      descriptionHe: 'המשך של אלגברה לינארית 1.',
      level: 'regular',
      creditPoints: '5',
      department: 'Mathematics',
      createdAt: new Date(),
      courseNumber: '20229',
    },
    {
      id: 20474,
      titleEn: 'Calculus 1',
      titleHe: 'חשבון אינפיניטסימלי 1',
      descriptionEn: 'An introductory course on calculus.',
      descriptionHe: 'קורס מבוא בחשבון אינפיניטסימלי.',
      level: 'regular',
      creditPoints: '7',
      department: 'Mathematics',
      createdAt: new Date(),
      courseNumber: '20474',
    },
    {
      id: 20475,
      titleEn: 'Calculus 2',
      titleHe: 'חשבון אינפיניטסימלי 2',
      descriptionEn: 'A continuation of Calculus 1.',
      descriptionHe: 'המשך של חשבון אינפיניטסימלי 1.',
      level: 'regular',
      creditPoints: '7',
      department: 'Mathematics',
      createdAt: new Date(),
      courseNumber: '20475',
    },
    {
      id: 20425,
      titleEn:
          'Probability and Introduction to Statistics for Computer Science',
      titleHe: 'הסתברות ומבוא לסטטיסטיקה למדעי המחשב',
      descriptionEn:
          'An introductory course on probability and statistics for computer science.',
      descriptionHe: 'קורס מבוא בהסתברות וסטטיסטיקה למדעי המחשב.',
      level: 'regular',
      creditPoints: '5',
      department: 'Mathematics',
      createdAt: new Date(),
      courseNumber: '20425',
    },
  ];

  const res = await db.insert(courses).values(newCourses).execute();
  return res;
}