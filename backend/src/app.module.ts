import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as config from 'config';
import { SeedsModule } from './seeds/seed.module';
import {ProductSeed} from "./products/seeds/product.seed";
import { VendingMachineModule } from './vending-machine/vending-machine.module';
import { CustomerModule } from './customer/customer.module';
import { OrdersModule } from './orders/orders.module';

const { type, host, database, port } = config.db;
console.log(`${type}://${host}:${port}/${database}`);
@Module({
  imports: [
    MongooseModule.forRoot(`${type}://${host}:${port}/${database}`),
    ProductsModule,
    SeedsModule,
    VendingMachineModule,
    CustomerModule,
    OrdersModule
  ],
  controllers: [],
  providers: [ProductSeed],
})
export class AppModule {}
