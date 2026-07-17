import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import {
  ClientsProviderAsyncOptions,
  GrpcOptions,
  Transport,
} from '@nestjs/microservices';

import { GrpcClientOptions } from '../interfaces/grpc-client-options.interface';

export class GrpcClientFactory {
  static create(options: GrpcClientOptions): ClientsProviderAsyncOptions {
    return {
      name: options.name,
      inject: [ConfigService],

      useFactory: (config: ConfigService): GrpcOptions => ({
        transport: Transport.GRPC,

        options: {
          package: options.package,

          protoPath: join(process.cwd(), 'libs/proto/src/lib', options.proto),

          url: `${config.getOrThrow<string>(
            options.hostEnv,
          )}:${config.getOrThrow<string>(options.portEnv)}`,
        },
      }),
    };
  }
}
