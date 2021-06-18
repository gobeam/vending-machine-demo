import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as config from 'config';
import { SeedsModule } from './seeds/seed.module';
import { ProductSeed } from './product/seeds/product.seed';
import { VendingMachineModule } from './vending-machine/vending-machine.module';
import { CustomerModule } from './customer/customer.module';
import { OrderModule } from './order/order.module';
import { BalanceModule } from './balance/balance.module';
const dbConfig = config.get('db');

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGO_URI || `${dbConfig.type}://${dbConfig.username ? dbConfig.username + ':' : ''}${
        dbConfig.password ? dbConfig.password + '@' : ''
      }${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`,
    ),
    ProductModule,
    SeedsModule,
    VendingMachineModule,
    CustomerModule,
    OrderModule,
    BalanceModule,
  ],
  controllers: [],
  providers: [ProductSeed],
})
export class AppModule {}
