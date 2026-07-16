import { Global, Module } from '@nestjs/common';
import { databaseProvider } from './database.provider';

@Global()
@Module({
  controllers: [],
  providers: [databaseProvider],
  exports: [databaseProvider],
})
export class SchoolSystemDatabaseModule {}
