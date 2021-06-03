import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import {ProductSeed} from "../products/seeds/product.seed";
import {ProductsModule} from "../products/products.module";
import {VendingMachineModule} from "../vending-machine/vending-machine.module";
import {VendingMachineSeed} from "../vending-machine/seeds/vending-machine.seed";

@Module({
    imports: [CommandModule, ProductsModule, VendingMachineModule],
    providers: [ProductSeed, VendingMachineSeed],
    exports: [ProductSeed, VendingMachineSeed],
})
export class SeedsModule {}
