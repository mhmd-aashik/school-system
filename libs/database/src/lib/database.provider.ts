import { Provider } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import { DRIZZLE_DATABASE } from './database.constants';

export const databaseProvider: Provider = {
  provide: DRIZZLE_DATABASE,

  useFactory: () => {
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
      throw new Error('DATABASE_URL is not defined');
    }

    const pool = new Pool({
      connectionString,
    });

    return drizzle(pool);
  },
};