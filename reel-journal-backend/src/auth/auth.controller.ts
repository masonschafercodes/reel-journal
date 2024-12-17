import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthOKEntity, AuthRegisterEntity } from './entities/auth.entity';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({ type: AuthOKEntity })
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const loginResponse = await this.authService.loginUser(loginUserDto);

    response.cookie('access_token', loginResponse.access_token, {
      httpOnly: process.env.NODE_ENV === 'production',
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    });

    return {
      success: true,
    };
  }

  @Post('register')
  @ApiCreatedResponse({ type: AuthRegisterEntity })
  async register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.registerUser(
      registerUserDto.email,
      registerUserDto.password,
      registerUserDto.firstName,
      registerUserDto.lastName,
    );
  }

  @Post('logout')
  @ApiOkResponse({ type: AuthOKEntity })
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('access_token');

    return {
      success: true,
    };
  }
}
