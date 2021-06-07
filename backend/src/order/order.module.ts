import { forwardRef, Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from './entities/order.entity';
import { ProductModule } from '../product/product.module';
import { CustomerModule } from '../customer/customer.module';
import { BalanceModule } from '../balance/balance.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]),
    ProductModule,
    forwardRef(() => CustomerModule),
    BalanceModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
