import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from 'mongoose';
import {VendingMachine} from "../../vending-machine/entities/vending-machine.entity";

export type ProductDocument = Product & Document;

@Schema()
export class Product {
    @Prop()
    name: string;

    @Prop()
    price: number;

    @Prop()
    stock: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
