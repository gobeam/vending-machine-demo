import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { BalanceTypeInterface } from '../interfaces/balance-type.interface';

export type BalanceDocument = Balance & Document;

@Schema()
export class Balance {
  @Prop()
  amount: number;

  @Prop()
  type: BalanceTypeInterface;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'VendingMachine' })
  vendingMachine: string;
}

export const BalanceSchema = SchemaFactory.createForClass(Balance);
