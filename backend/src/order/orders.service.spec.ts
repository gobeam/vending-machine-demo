import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument, PaymentType } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { ProductService } from '../product/product.service';
import { CustomerService } from '../customer/customer.service';
import { ForbiddenException } from '@nestjs/common';

const mockOrder = {
  customer: '60b8c2163a53077270b63812',
  product: 'productId',
  vendingMachine: 'vendingId',
  quantity: 1,
  paymentType: PaymentType.COIN,
};

const mockProduct = { name: 'Coke', price: 20, stock: 10 };
const mockCustomer = { token: 'tester', balance: 100 };
const mockOrderModel = () => ({
  create: jest.fn(),
  remove: jest.fn(),
  exec: jest.fn(),
});

const mockProductService = () => ({
  findOne: jest.fn(),
});

const mockCustomerService = () => ({
  findOne: jest.fn(),
});

describe('OrdersService', () => {
  let service: OrdersService, model, productService, customerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: getModelToken('Order'),
          useFactory: mockOrderModel,
        },
        {
          provide: ProductService,
          useFactory: mockProductService,
        },
        {
          provide: CustomerService,
          useFactory: mockCustomerService,
        },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    productService = module.get<ProductService>(ProductService);
    customerService = module.get<CustomerService>(CustomerService);
    model = module.get<Model<OrderDocument>>(getModelToken('Order'));
  });

  describe('test create order different scenarios', () => {
    let input: CreateOrderDto;
    beforeEach(() => {
      input = {
        ...mockOrder,
      };
    });
    it('create order with invalid product id', async () => {
      productService.findOne.mockResolvedValue(null);
      await expect(service.create(input)).rejects.toThrowError(
        ForbiddenException,
      );
    });

    it('create order with invalid customer id', async () => {
      productService.findOne.mockResolvedValue(mockProduct);
      customerService.findOne.mockResolvedValue(null);
      await expect(service.create(input)).rejects.toThrowError(
        ForbiddenException,
      );
    });

    it('create order that is higher than user balance', async () => {
      productService.findOne.mockResolvedValue(mockProduct);
      customerService.findOne.mockResolvedValue(mockCustomer);
      input.quantity = 100;
      jest.spyOn(service, 'getCustomerPaidOrderBalance').mockResolvedValue([{totalAmount: 100}]);
      await expect(service.create(input)).rejects.toThrowError(ForbiddenException);
      expect(productService.findOne).toHaveBeenCalledTimes(1);
      expect(productService.findOne).toHaveBeenCalledWith(input.product);
      expect(customerService.findOne).toHaveBeenCalledTimes(1);
      expect(service.getCustomerPaidOrderBalance).toHaveBeenCalledTimes(1);
    });

    it('create successful order', async () => {
      productService.findOne.mockResolvedValue(mockProduct);
      customerService.findOne.mockResolvedValue(mockCustomer);
      input.quantity = 1;
      jest.spyOn(service, 'getCustomerPaidOrderBalance').mockResolvedValue([{totalAmount: 50}]);
      await service.create(input);
      expect(productService.findOne).toHaveBeenCalledTimes(1);
      expect(customerService.findOne).toHaveBeenCalledTimes(1);
      expect(service.getCustomerPaidOrderBalance).toHaveBeenCalledTimes(1);
      expect(model.create).toHaveBeenCalledTimes(1);

    });
  });

  it('delete order by id', async () => {
    const _id = 'testId';
    await service.remove(_id);
    expect(model.remove).toHaveBeenCalledWith({ _id });
  });
});
