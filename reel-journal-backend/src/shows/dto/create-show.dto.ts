import { ApiProperty } from '@nestjs/swagger';

export class CreateShowDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  apiId: string;
}
