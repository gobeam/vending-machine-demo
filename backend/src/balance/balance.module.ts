import { Module } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BalanceSchema } from './entities/balance.entity';
import { BalanceController } from './balance.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Balance', schema: BalanceSchema }]),
  ],
  controllers: [BalanceController],
  providers: [BalanceService],
  exports: [BalanceService],
})
export class BalanceModule {}
