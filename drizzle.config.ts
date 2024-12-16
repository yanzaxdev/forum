import {config} from 'dotenv';
import {type Config} from 'drizzle-kit';
import {env} from '~/env';

// Explicitly load .env.local
config({path: '.env.local'});

export default {
  schema: './src/server/db/schema',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.POSTGRES_URL,
  },
  tablesFilter: ['forum_*'],
} satisfies Config;
