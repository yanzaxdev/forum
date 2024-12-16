import {db} from '~/server/db';
import {recalculateAllCourseRankings} from '~/server/db/mutations/recalculateCourseRanking';

async function main() {
  try {
    console.log('Starting recalculation...');
    const result = await recalculateAllCourseRankings(db);
    console.log('Recalculation complete:', result);
  } catch (error) {
    console.error('Failed to recalculate:', error);
  } finally {
    process.exit(0);
  }
}

main();