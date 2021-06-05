import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { ProductService } from '../product.service';

@Injectable()
export class ProductSeed {
  constructor(private readonly service: ProductService) {}

  @Command({
    command: 'seed:product <vendorId>',
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
