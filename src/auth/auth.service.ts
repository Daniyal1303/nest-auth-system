import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { User } from 'generated/prisma';
import * as jwt from 'jsonwebtoken';
import { OtpService } from 'src/otp/otp.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private prismaService: PrismaService,
    private otpService: OtpService,
  ) {}
  private readonly jwtSecrets = this.configService.get<string>('JWT_SECRET');

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  async generateToken(userId: number): Promise<string> {
    return jwt.sign({ userId }, this.jwtSecrets, { expiresIn: '1h' });
  }

  async register(user: {
    name: string;
    email: string;
    password: string;
  }): Promise<User & { token: string; otp: string }> {
    const hashedPassword = await this.hashPassword(user.password);
    const createdUser = await this.prismaService.user.create({
      data: { ...user, password: hashedPassword },
    });

    const token = await this.generateToken(createdUser.id);
    const { otp } = await this.otpService.sendOtp(user.email);
    return { ...createdUser, token, otp };
  }

  async login(
    email: string,
    password: string,
  ): Promise<User & { token: string }> {
    const user = await this.prismaService.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = await this.generateToken(user.id);
    return { ...user, token };
  }

  async validateToken(token: string): Promise<any> {
    try {
      return jwt.verify(token, this.jwtSecrets);
    } catch (error) {
      console.log('token validation error', error);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
