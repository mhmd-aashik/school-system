import { Module } from '@nestjs/common';
import { StudentController } from './app.controller';
import { StudentService } from './app.service';
import { SchoolSystemDatabaseModule } from '@school-system/database';
import { StudentRepository } from './student.repository';

@Module({
  imports: [SchoolSystemDatabaseModule],
  controllers: [StudentController],
  providers: [StudentService, StudentRepository],
})
export class StudentModule {}
