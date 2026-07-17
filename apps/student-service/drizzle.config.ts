import { defineConfig } from 'drizzle-kit';
import 'dotenv/config';

if (!process.env.STUDENT_DATABASE_URL) {
  throw new Error('STUDENT_DATABASE_URL is not defined');
}

export default defineConfig({
  dialect: 'postgresql',
  schema: './apps/student-service/src/app/schemas/*.schema.ts',
  out: './drizzle/student-service',
  dbCredentials: {
    url: process.env.STUDENT_DATABASE_URL,
  },
  strict: true,
  verbose: true,
});
