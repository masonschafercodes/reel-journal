import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) {}

  async loginUser(user: { email: string; password: string }) {
    const validatedUser = await this.validateUser(user.email, user.password);

    if (!validatedUser) {
      throw new HttpException('Invalid credentials', 401);
    }

    const payload = { email: validatedUser.email, sub: validatedUser.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (user && (await argon2.verify(user.password, password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async registerUser(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ) {
    try {
      const hashedPassword = await argon2.hash(password);
      const user = await this.prismaService.user.create({
        data: {
          email,
          password: hashedPassword,
          firstName,
          lastName,
        },
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: noop, ...result } = user;
      return result;
    } catch {
      return null;
    }
  }
}
