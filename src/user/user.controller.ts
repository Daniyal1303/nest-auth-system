/* eslint-disable prettier/prettier */
import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user') //Decorator
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  getUsers() {
    return this.userService.getAllUsers();
  }
  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.userService.getUserById(Number(id));
  }
}
