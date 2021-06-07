import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CustomerDocument = Customer & Document;

@Schema()
export class Customer {
  @Prop()
  token: string;

  @Prop()
  balance: number;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
