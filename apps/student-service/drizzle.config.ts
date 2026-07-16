import 'dotenv/config';

import { defineConfig } from 'drizzle-kit';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined');
}

export default defineConfig({
  dialect: 'postgresql',
  schema: './apps/student-service/src/app/schemas/*.schema.ts',
  out: './drizzle/student-service',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  strict: true,
  verbose: true,
});
