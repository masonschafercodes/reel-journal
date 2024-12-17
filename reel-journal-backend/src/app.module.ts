import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ShowsModule } from './shows/shows.module';
import { SeasonsModule } from './seasons/seasons.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule, ShowsModule, SeasonsModule],
})
export class AppModule {}
