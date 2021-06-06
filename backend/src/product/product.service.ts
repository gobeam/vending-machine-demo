import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './entities/product.entity';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private readonly model: Model<ProductDocument>,
  ) {}

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
    return await this.model.find({}).populate('order').exec();
  }

  /**
   * find by id
   * @param id
   */
  async findOne(id: string): Promise<Product> {
    return this.model.findById(id).exec();
  }
}
