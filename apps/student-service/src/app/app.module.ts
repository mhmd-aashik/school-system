import { Module } from '@nestjs/common';
import { StudentController } from './app.controller';
import { StudentService } from './app.service';
import { SchoolSystemDatabaseModule } from '@school-system/database';

@Module({
  imports: [SchoolSystemDatabaseModule],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
