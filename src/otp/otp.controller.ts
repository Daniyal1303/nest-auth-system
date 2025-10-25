import { Body, Controller, Post } from '@nestjs/common';
import { OtpService } from './otp.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @ApiOperation({ summary: 'Send OTP to email' })
  @Post()
  async sendOtp(
    @Body('email') email: string,
  ): Promise<{ message: string; otp: string }> {
    const result = await this.otpService.sendOtp(email);
    return { message: 'OTP sent successfully', otp: result.otp };
  }
}
