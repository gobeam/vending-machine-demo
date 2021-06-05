import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { ProductSeed } from '../product/seeds/product.seed';
import { ProductModule } from '../product/product.module';
import { VendingMachineModule } from '../vending-machine/vending-machine.module';
import { VendingMachineSeed } from '../vending-machine/seeds/vending-machine.seed';

@Module({
  imports: [CommandModule, ProductModule, VendingMachineModule],
  providers: [ProductSeed, VendingMachineSeed],
  exports: [ProductSeed, VendingMachineSeed],
})
export class SeedsModule {}
