import { ApiProperty } from '@nestjs/swagger';

export class CreateSeasonDto {
  @ApiProperty()
  airDate: Date;

  @ApiProperty()
  apiId: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  overview: string;

  @ApiProperty({ required: false })
  poster: string | null;

  @ApiProperty()
  seasonNumber: number;

  @ApiProperty()
  showId: string;
}
