import { ApiProperty } from '@nestjs/swagger';
import { Show } from '@prisma/client';
import { SeasonEntity } from '../../seasons/entities/season.entity';

export class ShowEntity implements Show {
  @ApiProperty()
  id: string;

  @ApiProperty()
  apiId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  description: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ required: false, type: () => [SeasonEntity] })
  seasons: SeasonEntity[];
}
