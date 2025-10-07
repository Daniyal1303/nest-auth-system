/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from './schema/employee.schema';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}
  @Get()
  // async getEmployees() {
  //   return this.employeeService.getEmployeesWithProfile();
  // }
  @Get(':id')
  async getEmployeeBy(@Param('id') id: string) {
    return this.employeeService.getAnEmployee(id);
  }
  @Post()
  async addEmployee(@Body() employeeData: Partial<Employee>) {
    // return this.employeeService.createEmployeeWithProfile(employeeData);
    return this.employeeService.createEmployee(employeeData);
  }
  @Put(':id')
  async completeUpdateEmployee(
    @Param('id') id: string,
    @Body() employeeData: Partial<Employee>,
  ) {
    return this.employeeService.updateAnEmployeeById(id, employeeData);
  }
  @Patch(':id')
  async partialUpdateEmployee(
    @Param('id') id: string,
    @Body() employeeData: Partial<Employee>,
  ) {
    return this.employeeService.patchAnEmployeeById(id, employeeData);
  }
  @Delete(':id')
  async removeEmployee(@Param('id') id: string) {
    return this.employeeService.deleteAnEmployee(id);
  }
}
