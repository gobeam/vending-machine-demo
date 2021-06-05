import { Module } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BalanceSchema } from './entities/balance.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Balance', schema: BalanceSchema }]),
  ],
  controllers: [],
  providers: [BalanceService],
  exports: [BalanceService],
})
export class BalanceModule {}
