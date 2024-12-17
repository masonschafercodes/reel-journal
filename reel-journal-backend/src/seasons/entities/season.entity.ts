import { ApiProperty } from '@nestjs/swagger';
import { Season } from '@prisma/client';

export class SeasonEntity implements Season {
  @ApiProperty()
  id: string;

  @ApiProperty()
  apiId: string;

  @ApiProperty()
  airDate: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  overview: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ required: false })
  poster: string | null;

  @ApiProperty()
  seasonNumber: number;

  @ApiProperty()
  showId: string;
}
