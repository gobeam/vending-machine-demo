import { Module } from '@nestjs/common';
import { VendingMachineService } from './vending-machine.service';
import { VendingMachineController } from './vending-machine.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { VendingMachineSchema } from './entities/vending-machine.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'VendingMachine', schema: VendingMachineSchema },
    ]),
  ],
  controllers: [VendingMachineController],
  providers: [VendingMachineService],
  exports: [VendingMachineService],
})
export class VendingMachineModule {}
