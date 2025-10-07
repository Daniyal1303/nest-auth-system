/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Employee, EmployeeDocument } from './schema/employee.schema';
import { Model } from 'mongoose';
import { Profile } from './schema/profile.schema';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>,
    @InjectModel(Profile.name) private profileModel: Model<Profile>,
  ) {}

  async createEmployee(data: Partial<Employee>): Promise<Employee> {
    const newEmployee = new this.employeeModel(data);
    await newEmployee.save();
    return newEmployee;
  }

  // async createEmployeeWithProfile(data: Partial<Employee>): Promise<Employee> {
  //   const profile = await new this.profileModel(data.profile).save();
  //   return new this.employeeModel({
  //     ...data,
  //     profile: profile._id,
  //   }).save();
  // }
  // async getEmployeesWithProfile(): Promise<Employee[]> {
  //   return this.employeeModel.find().populate('profile').exec();
  // }

  async getAllEmployees(): Promise<Employee[]> {
    return this.employeeModel.find().exec();
  }
  getAnEmployee(id: string): Promise<Employee | null> {
    return this.employeeModel.findById(id).exec();
  }
  async updateAnEmployeeById(
    id: string,
    data: Partial<Employee>,
  ): Promise<Employee | null> {
    return this.employeeModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }
  async patchAnEmployeeById(
    id: string,
    data: Partial<Employee>,
  ): Promise<Employee | null> {
    return this.employeeModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }
  async deleteAnEmployee(id: string): Promise<Employee | null> {
    return this.employeeModel.findByIdAndDelete(id).exec();
  }
}
