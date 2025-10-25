import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { OtpModule } from 'src/otp/otp.module';

@Module({
  imports: [ConfigModule, OtpModule],
  exports: [AuthService],
  providers: [AuthService, PrismaService],
  controllers: [AuthController],
})
export class AuthModule {}
