import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { ProductService } from '../product.service';

@Injectable()
export class ProductSeed {
  constructor(private readonly service: ProductService) {}

  @Command({
    command: 'seed:product',
    describe: 'seed product',
    autoExit: true,
  })
  async create() {
    const products = await this.service.createMany([
      {
        name: 'Coke',
        price: 20,
        image:
          'https://toppng.com/uploads/preview/coke-free-desktop-115385941292ptblrvxaz.png',
        stock: 10,
      },
      {
        name: 'Pepsi',
        price: 25,
        image:
          'https://toppng.com/uploads/preview/pepsi-11538681711xinb1lyzap.png',
        stock: 10,
      },
      {
        name: 'Dew',
        price: 30,
        image:
          'https://toppng.com/uploads/preview/mountain-dew-image-11526062217u23bq6aak8.png',
        stock: 10,
      },
    ]);
    console.log(products);
  }
}
