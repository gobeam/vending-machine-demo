import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiTags } from '@nestjs/swagger';
import { Product } from './entities/product.entity';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productsService: ProductService) {}

  @Get()
  findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }
}
