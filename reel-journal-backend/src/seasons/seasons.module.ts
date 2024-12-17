import { Module } from '@nestjs/common';
import { SeasonsService } from './seasons.service';
import { SeasonsController } from './seasons.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [SeasonsController],
  providers: [SeasonsService],
  imports: [PrismaModule],
})
export class SeasonsModule {}
