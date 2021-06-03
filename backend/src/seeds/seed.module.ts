import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import {ProductSeed} from "../products/seeds/product.seed";
import {ProductsModule} from "../products/products.module";

@Module({
    imports: [CommandModule, ProductsModule],
    providers: [ProductSeed],
    exports: [ProductSeed],
})
export class SeedsModule {}
