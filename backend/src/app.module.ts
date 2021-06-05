import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as config from 'config';
import { SeedsModule } from './seeds/seed.module';
import { ProductSeed } from './product/seeds/product.seed';
import { VendingMachineModule } from './vending-machine/vending-machine.module';
import { CustomerModule } from './customer/customer.module';
import { OrdersModule } from './order/orders.module';
import { BalanceModule } from './balance/balance.module';

const { type, host, database, port } = config.db;
console.log(`${type}://${host}:${port}/${database}`);

@Module({
  imports: [
    MongooseModule.forRoot(`${type}://${host}:${port}/${database}`),
    ProductModule,
    SeedsModule,
    VendingMachineModule,
    CustomerModule,
    OrdersModule,
    BalanceModule,
  ],
  controllers: [],
  providers: [ProductSeed],
})
export class AppModule {}
