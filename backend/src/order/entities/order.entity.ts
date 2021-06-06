import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { OrderStatusInterface } from '../interfaces/order-status.interface';
import { PaymentTypeInterface } from '../interfaces/payment-type.interface';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop()
  quantity: number;

  @Prop()
  amount: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Product' })
  product: string;

  @Prop()
  status: OrderStatusInterface;

  @Prop()
  paymentType: PaymentTypeInterface;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Customer' })
  customer: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'VendingMachine' })
  vendingMachine: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
