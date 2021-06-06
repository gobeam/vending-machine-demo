import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './entities/product.entity';

const mockProduct = { name: 'Coke', price: 20, stock: 10, image: 'image' };
const mockProductModel = () => ({
  new: jest.fn(),
  constructor: jest.fn(),
  insertMany: jest.fn(),
  find: () => mockProductModel,
  exec: jest.fn(),
});

describe('ProductsService', () => {
  let service: ProductService, model;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getModelToken('Product'),
          useFactory: mockProductModel,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    model = module.get<Model<ProductDocument>>(getModelToken('Product'));
  });

  it('create many products', async () => {
    model.insertMany.mockResolvedValue([mockProduct]);
    await service.createMany([mockProduct]);
    expect(model.insertMany).toHaveBeenCalledTimes(1);
    expect(model.insertMany).not.toThrow();
  });

  it('get product list', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      populate: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce([mockProduct]),
      }),
    } as any);
    const result = await service.findAll();
    expect(model.find).toHaveBeenCalledTimes(1);
    expect(model.find({}).populate).toHaveBeenCalledTimes(1);
    expect(model.find({}).populate('order').exec).toHaveBeenCalledTimes(1);
    expect(result).toEqual([mockProduct]);
  });
});
