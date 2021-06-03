import { Command, Positional } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { ProductsService } from '../products.service';

@Injectable()
export class ProductSeed {
  constructor(private readonly service: ProductsService) {}

  @Command({
    command: 'seed:product',
    describe: 'seed product',
    autoExit: true,
  })
  async create() {
    const products = await this.service.createMany([
      { name: 'Coke', price: 20, stock: 10 },
      { name: 'Pepsi', price: 25, stock: 10 },
      { name: 'Dew', price: 30, stock: 10 },
    ]);
    console.log(products);
  }
}
