/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { StudentModule } from './app/student.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    StudentModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'student',
        protoPath: join(process.cwd(), 'libs/proto/src/lib/student.proto'),
        url: 'localhost:50051',
      },
    },
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen();

  Logger.log('🚀 Student gRPC Service is running on localhost:50051');
}

bootstrap();
