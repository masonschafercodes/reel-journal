import { Module } from '@nestjs/common';
import { ShowsService } from './shows.service';
import { ShowsController } from './shows.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [ShowsController],
  providers: [ShowsService],
  imports: [PrismaModule],
})
export class ShowsModule {}
