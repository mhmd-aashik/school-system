import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { GRPC_CLIENTS, StudentGrpcService } from '@school-system/grpc';

@Injectable()
export class StudentService implements OnModuleInit {
  private studentGrpcService!: StudentGrpcService;
  constructor(
    @Inject(GRPC_CLIENTS.STUDENT)
    private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.studentGrpcService =
      this.client.getService<StudentGrpcService>('StudentService');
  }

  getStudents() {
    return this.studentGrpcService.getStudents({});
  }
}
