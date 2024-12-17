import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ShowsModule } from './shows/shows.module';
import { SeasonsModule } from './seasons/seasons.module';

@Module({
  imports: [PrismaModule, ShowsModule, SeasonsModule],
})
export class AppModule {}
