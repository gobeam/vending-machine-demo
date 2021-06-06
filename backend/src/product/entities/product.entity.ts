import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Order } from '../../order/entities/order.entity';

export type ProductDocument = Product & Document;

@Schema({
  toJSON: { virtuals: true, getters: true },
  toObject: { virtuals: true, getters: true },
})
export class Product {
  @Prop()
  name: string;

  @Prop()
  image: string;

  @Prop()
  price: number;

  @Prop()
  stock: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.virtual('order', {
  ref: 'Order',
  localField: '_id',
  foreignField: 'product',
  justOne: false,
});
