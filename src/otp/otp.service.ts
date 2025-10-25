import { Injectable } from '@nestjs/common';
import { randomInt } from 'crypto';
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
import { VerifyOtpDto } from './dto/otp.dto';
import { PrismaService } from 'src/prisma/prisma.service';

dotenv.config();

@Injectable()
export class OtpService {
  private readonly emailTransporter;

  constructor(private readonly prismaService: PrismaService) {
    this.emailTransporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_PORT === '465',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  private generateOtp(): string {
    const otp = randomInt(100000, 999999).toString(); // Generate a 6-digit OTP
    return otp;
  }

  async sendOtpToEmail(email: string): Promise<string> {
    const otp = this.generateOtp();
    try {
      await this.emailTransporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is: ${otp}`,
        html: `<p>Your OTP is <strong>${otp}</strong></p>`,
      });
      return otp;
    } catch (error) {
      console.error('Error sending OTP via email', error);
      throw new Error('Failed to send OTP via email');
    }
  }

  async sendOtp(email: string): Promise<{ otp: string }> {
    const otp = await this.sendOtpToEmail(email);

    // Store OTP in a cache, database, or memory for verification (with expiry)
    return { otp };
  }

  async verifyOtp({ email, otp }: VerifyOtpDto): Promise<void> {
    const user = await this.prismaService.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      throw new Error('User not found');
    }

    if (user.otp !== otp) {
      throw new Error('Invalid OTP');
    }
    if (user.otpExpiresAt && user.otpExpiresAt < new Date()) {
      throw new Error('OTP has expired');
    }
  }

  async clearOtp(email: string): Promise<void> {
    await this.prismaService.user.update({
      where: { email: email },
      data: { otp: null, otpExpiresAt: null },
    });
  }
}
