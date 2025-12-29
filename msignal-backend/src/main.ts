import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';

const isProd = process.env.NODE_ENV === 'production';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    logger: isProd ? ['error', 'warn'] : ['error', 'warn', 'log'],
  });

  app.useLogger(app.get(Logger));
  app.enableShutdownHooks();

  app.use(
    helmet({
      // default helmet config is fine for now
    }),
  );

  const prodOrigins = [
    'https://m-signal.co.kr',
    'https://www.m-signal.co.kr',
    'https://api.m-signal.co.kr', // optional, but harmless if you ever call yourself
  ];

  const devOrigins = ['http://localhost:3000', 'http://127.0.0.1:3000'];

  app.enableCors({
    origin: isProd ? prodOrigins : devOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const port = Number(process.env.PORT) || 3001;
  await app.listen(port, '0.0.0.0');
  if (!isProd) {
    // eslint-disable-next-line no-console
    console.log(`🚀 Server running on http://localhost:${port}`);
  }
}
bootstrap();