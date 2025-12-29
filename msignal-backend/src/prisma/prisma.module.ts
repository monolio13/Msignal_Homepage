import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { AppController } from 'src/app.controller';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
  controllers: [AppController],
})
export class PrismaModule {}
