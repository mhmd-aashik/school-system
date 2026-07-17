import { DynamicModule, Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { GrpcClientFactory } from './factories/grpc-client.factory';
import { GrpcClientOptions } from './interfaces/grpc-client-options.interface';

@Module({})
export class GrpcModule {
  static register(options: GrpcClientOptions): DynamicModule {
    return {
      module: GrpcModule,
      imports: [
        ClientsModule.registerAsync([GrpcClientFactory.create(options)]),
      ],
      exports: [ClientsModule],
    };
  }
}
