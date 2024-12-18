import {
  Body,
  Controller,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request as ExpressRequest, Response } from 'express';
import { AuthOKEntity, AuthRegisterEntity } from './entities/auth.entity';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('me')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: AuthRegisterEntity })
  async me(@Request() req: ExpressRequest) {
    if (!req.user) {
      return null;
    }

    return this.authService.getUser(req.user.userId);
  }

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
