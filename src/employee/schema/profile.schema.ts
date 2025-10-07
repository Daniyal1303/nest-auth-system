/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Profile {
  @Prop()
  age: number;

  @Prop()
  qualification: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
