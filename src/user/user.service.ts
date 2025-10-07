/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private users = [
    { id: 1, name: 'John', age: 29 },
    { id: 2, name: 'Doe', age: 30 },
    { id: 3, name: 'Smith', age: 31 },
  ];
  getAllUsers() {
    return this.users;
  }
  getUserById(id: number) {
    return this.users.find((user) => user.id === id);
  }
}
