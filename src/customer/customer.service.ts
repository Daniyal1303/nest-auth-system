/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Customer } from './interfaces/customer.interface';
import { CreateCustomerDTO } from './dto/customer.dto';

@Injectable()
export class CustomerService {
  private customers: Customer[] = [];

  getAllCustomers(): Customer[] {
    return this.customers;
  }
  addCustomer(createCustomerDTO: CreateCustomerDTO): Customer {
    const newCustomer = { id: Date.now(), ...createCustomerDTO };
    this.customers.push(newCustomer);
    return newCustomer;
  }
  
}
