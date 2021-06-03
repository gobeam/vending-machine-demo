import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './entities/product.entity';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService{
  constructor(
    @InjectModel('Product') private readonly model: Model<ProductDocument>,
  ) {

  }

  /**
   * Create multiple products
   * @param products
   */
  createMany(products: Partial<Product[]>): Promise<Product[]> {
    return this.model.insertMany(products);
  }

  /**
   * Get all products
   */
  async findAll(): Promise<Product[]> {
    return this.model.find().exec();
  }
}
