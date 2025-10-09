import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  async addUser(data: { email: string; name: string; password: string }) {
    return this.userService.createUser(data);
  }
  async getUsers() {
    return this.userService.findUsers();
  }
}
