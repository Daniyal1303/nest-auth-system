/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Address } from './address.schema';
import { Profile } from './profile.schema';

export type EmployeeDocument = Employee & Document;

@Schema({ timestamps: true })
export class Employee extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  age: number;

  @Prop()
  email?: string;

  // @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Profile' })
  // profile: Profile;

  // Embedded Document
  @Prop({ type: Address })
  address: Address;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
