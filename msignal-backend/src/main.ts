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
      // If you later embed admin panel in iframe etc, adjust here.
      // defaults are good
    }),
  );

  app.enableCors({
    origin: isProd
      ? ['https://your-frontend-domain.com']
      : ['http://localhost:3000'],
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

  await app.listen(Number(process.env.PORT) || 3001, '0.0.0.0');
}
bootstrap();
