import { ApiProperty } from '@nestjs/swagger';

export class AuthOKEntity {
  @ApiProperty()
  success: boolean;
}

export class AuthRegisterEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
