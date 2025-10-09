import { Injectable } from '@nestjs/common';
import { User } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async createUser(data: { email: string; name: string; password: string }) {
    return this.prisma.user.create({ data });
  }

  async findUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }
}
