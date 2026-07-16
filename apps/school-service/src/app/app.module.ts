import { Module } from '@nestjs/common';
import { StudentController } from './app.controller';
import { StudentService } from './app.service';

@Module({
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
