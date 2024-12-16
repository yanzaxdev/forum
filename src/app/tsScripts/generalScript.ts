import {InferInsertModel} from 'drizzle-orm';
import {courseRankings, courses, db, users} from '~/server/db';
import {updateCourseRankings} from '~/server/db/mutations/updateCourseRankings';

export async function popScript() {
  const newCourseRankings: InferInsertModel<typeof courseRankings>[] = [
    // Rankings by David
    {
      courseId: 20109,
      userId: 1,
      assignmentDifficulty: '4',
      examDifficulty: '3',
      grade: '95',
      interestLevel: '4',
      createdAt: new Date(),
    },
    {
      courseId: 20229,
      userId: 1,
      assignmentDifficulty: '4',
      examDifficulty: '3',
      grade: '85',
      interestLevel: '3',
      createdAt: new Date(),
    },
    {
      courseId: 20474,
      userId: 1,
      assignmentDifficulty: '3',
      examDifficulty: '2',
      grade: '90',
      interestLevel: '5',
      createdAt: new Date(),
    },
    {
      courseId: 20475,
      userId: 1,
      assignmentDifficulty: '3',
      examDifficulty: '2',
      grade: '92',
      interestLevel: '4',
      createdAt: new Date(),
    },
    {
      courseId: 20425,
      userId: 1,
      assignmentDifficulty: '4',
      examDifficulty: '3',
      grade: '88',
      interestLevel: '3',
      createdAt: new Date(),
    },
    // Rankings by Alice
    {
      courseId: 20109,
      userId: 2,
      assignmentDifficulty: '4',
      examDifficulty: '3',
      grade: '95',
      interestLevel: '4',
      createdAt: new Date(),
    },
    {
      courseId: 20229,
      userId: 2,
      assignmentDifficulty: '4',
      examDifficulty: '3',
      grade: '85',
      interestLevel: '3',
      createdAt: new Date(),
    },
    {
      courseId: 20474,
      userId: 2,
      assignmentDifficulty: '3',
      examDifficulty: '2',
      grade: '90',
      interestLevel: '5',
      createdAt: new Date(),
    },
    {
      courseId: 20475,
      userId: 2,
      assignmentDifficulty: '3',
      examDifficulty: '2',
      grade: '92',
      interestLevel: '4',
      createdAt: new Date(),
    },
    {
      courseId: 20425,
      userId: 2,
      assignmentDifficulty: '4',
      examDifficulty: '3',
      grade: '88',
      interestLevel: '3',
      createdAt: new Date(),
    },
    // Rankings by Bob
    {
      courseId: 20109,
      userId: 3,
      assignmentDifficulty: '2',
      examDifficulty: '1',
      grade: '80',
      interestLevel: '4',
      createdAt: new Date(),
    },
    {
      courseId: 20229,
      userId: 3,
      assignmentDifficulty: '3',
      examDifficulty: '2',
      grade: '85',
      interestLevel: '4',
      createdAt: new Date(),
    },
    {
      courseId: 20474,
      userId: 3,
      assignmentDifficulty: '4',
      examDifficulty: '3',
      grade: '90',
      interestLevel: '5',
      createdAt: new Date(),
    },
    {
      courseId: 20475,
      userId: 3,
      assignmentDifficulty: '3',
      examDifficulty: '2',
      grade: '88',
      interestLevel: '4',
      createdAt: new Date(),
    },
    {
      courseId: 20425,
      userId: 3,
      assignmentDifficulty: '4',
      examDifficulty: '3',
      grade: '92',
      interestLevel: '5',
      createdAt: new Date(),
    },
    // Rankings by Charlie
    {
      courseId: 20109,
      userId: 4,
      assignmentDifficulty: '3',
      examDifficulty: '2',
      grade: '85',
      interestLevel: '4',
      createdAt: new Date(),
    },
    {
      courseId: 20229,
      userId: 4,
      assignmentDifficulty: '4',
      examDifficulty: '3',
      grade: '90',
      interestLevel: '4',
      createdAt: new Date(),
    },
    {
      courseId: 20474,
      userId: 4,
      assignmentDifficulty: '3',
      examDifficulty: '2',
      grade: '88',
      interestLevel: '5',
      createdAt: new Date(),
    },
    {
      courseId: 20475,
      userId: 4,
      assignmentDifficulty: '4',
      examDifficulty: '3',
      grade: '92',
      interestLevel: '4',
      createdAt: new Date(),
    },
    {
      courseId: 20425,
      userId: 4,
      assignmentDifficulty: '3',
      examDifficulty: '2',
      grade: '90',
      interestLevel: '5',
      createdAt: new Date(),
    },
    // Rankings by Eve
    {
      courseId: 20109,
      userId: 5,
      assignmentDifficulty: '4',
      examDifficulty: '3',
      grade: '90',
      interestLevel: '4',
      createdAt: new Date(),
    },
    {
      courseId: 20229,
      userId: 5,
      assignmentDifficulty: '3',
      examDifficulty: '2',
      grade: '85',
      interestLevel: '4',
      createdAt: new Date(),
    },
    {
      courseId: 20474,
      userId: 5,
      assignmentDifficulty: '4',
      examDifficulty: '3',
      grade: '88',
      interestLevel: '5',
      createdAt: new Date(),
    },
    {
      courseId: 20475,
      userId: 5,
      assignmentDifficulty: '3',
      examDifficulty: '2',
      grade: '90',
      interestLevel: '4',
      createdAt: new Date(),
    },
    {
      courseId: 20425,
      userId: 5,
      assignmentDifficulty: '4',
      examDifficulty: '3',
      grade: '92',
      interestLevel: '5',
      createdAt: new Date(),
    },
  ];

  const resArray = [];
  for (const ranking of newCourseRankings) {
    const res = await updateCourseRankings(db, ranking);
    resArray.push(res);
  }

  return resArray;
}



// // Example usage in wherever you're handling the course ranking submission
// // This could be in an API route, form submission handler, etc.

// import {db} from '~/server/db';
// import {updateCourseRankings} from '~/server/db/mutations/courseRankings';

// // Example function handling a course ranking submission
// async function handleCourseRankingSubmission() {
//   try {
//     const newRanking = {
//       courseId: 123,  // The course ID
//       userId: 456,    // The user ID
//       grade: 85.5,
//       examDifficulty: 4.2,
//       assignmentDifficulty: 3.8,
//       interestLevel: 4.5,
//     };

//     // This will:
//     // 1. Insert/update the user's ranking
//     // 2. Recalculate the course averages
//     // 3. Return the updated course data
//     const updatedCourse = await updateCourseRankings(db, newRanking);

//     console.log('Course updated:', updatedCourse);
//   } catch (error) {
//     console.error('Error updating course ranking:', error);
//   }
// }

// // If you want to check existing rankings:
// async function checkExistingRankings() {
//   // Get all rankings for a course
//   const allRankings = await getCourseRankings(db, 123);

//   // Get a specific user's ranking
//   const userRanking = await getUserCourseRanking(db, 123, 456);
// }