import { Module } from '@nestjs/common';
import { StudentController } from './controllers/student.controller';
import { StudentService } from './services/student.service';
import { SchoolSystemDatabaseModule } from '@school-system/database';
import { StudentRepository } from './repositories/student.repository';

@Module({
  imports: [SchoolSystemDatabaseModule],
  controllers: [StudentController],
  providers: [StudentService, StudentRepository],
})
export class StudentModule {}
