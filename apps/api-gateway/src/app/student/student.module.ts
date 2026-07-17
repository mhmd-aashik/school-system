import { Module } from '@nestjs/common';
import { StudentController } from './controllers/student.controller';
import { StudentService } from './services/student.service';
import { GRPC_CLIENTS, GrpcModule } from '@school-system/grpc';

@Module({
  imports: [
    GrpcModule.register({
      name: GRPC_CLIENTS.STUDENT,
      package: 'student',
      proto: 'student.proto',
      hostEnv: 'STUDENT_GRPC_HOST',
      portEnv: 'STUDENT_GRPC_PORT',
    }),
  ],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
