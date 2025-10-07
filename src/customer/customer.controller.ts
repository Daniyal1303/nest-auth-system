/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDTO } from './dto/customer.dto';
import { UppercasePipe } from 'src/common/pipes/uppercase/uppercase.pipe';
import { AuthGuard } from 'src/guards/auth/auth.guard';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  @UseGuards(AuthGuard)
  getAllCustomers() {
    return this.customerService.getAllCustomers();
  }

  @Post()
  createCustomer(@Body() createCustomerDTO: CreateCustomerDTO) {
    return this.customerService.addCustomer(createCustomerDTO);
  }
  @Post('uppercase')
  transformToUppercase(@Body('name', new UppercasePipe()) name: string) {
    return `name of customer is ${name}`;
  }
}
