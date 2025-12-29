import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { LoggerModule } from 'nestjs-pino';

import { PrismaModule } from './prisma/prisma.module';
import { AppController } from './app.controller';
import { AdminAuthModule } from './modules/admin-auth/admin-auth.module';
import { UserModule } from './modules/user/user.module';

const isProd = process.env.NODE_ENV === 'production';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: isProd ? '.env.prod' : '.env',
      cache: true,
      expandVariables: true,
    }),

    // ✅ Global rate limit (fine baseline)
    ThrottlerModule.forRoot([
      {
        ttl: 60_000,
        limit: isProd ? 60 : 120, // tighter in prod
      },
    ]),

    // ✅ Professional logging: quiet + useful
    LoggerModule.forRoot({
      pinoHttp: {
        // ✅ stop "request completed" spam (choose one)
        // Option A: disable all request logs
        // autoLogging: false,

        // Option B (recommended): ignore only noisy routes
        autoLogging: {
          ignore: (req) => req.url === '/' || req.url === '/health',
        },

        // ✅ reduce log noise
        level: isProd ? 'warn' : 'info',

        // ✅ hide sensitive headers in logs
        redact: {
          paths: [
            'req.headers.authorization',
            'req.headers.cookie',
            'req.headers["x-api-key"]',
          ],
          remove: true,
        },

        // ✅ pretty logs in dev only
        transport: !isProd
          ? { target: 'pino-pretty', options: { singleLine: true } }
          : undefined,
      },
    }),

    PrismaModule,
    AdminAuthModule,
    UserModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
