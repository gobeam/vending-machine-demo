import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { ProductService } from '../product/product.service';
import { CustomerService } from '../customer/customer.service';
import { ForbiddenException } from '@nestjs/common';
import { BalanceService } from '../balance/balance.service';
import { PaymentTypeInterface } from './interfaces/payment-type.interface';

const mockOrder = {
  customer: '60b8c2163a53077270b63812',
  product: '60bc79221928d8386487d671',
  vendingMachine: 'vendingId',
  quantity: 1,
  paymentType: PaymentTypeInterface.COIN,
  save: jest.fn(),
};

const mockProduct = { name: 'Coke', price: 20, stock: 10 };
const mockCustomer = { token: 'tester', balance: 100 };
const mockOrderModel = () => ({
  create: jest.fn(),
  aggregate: jest.fn().mockReturnValue(() => ({
    exec: jest.fn(),
  })),
  findById: jest.fn(),
  remove: jest.fn(),
  exec: jest.fn(),
});

const mockProductService = () => ({
  findOne: jest.fn(),
});

const mockBalanceService = () => ({
  create: jest.fn(),
});

const mockCustomerService = () => ({
  findOne: jest.fn(),
});

describe('OrdersService', () => {
  let service: OrderService,
    model,
    productService,
    customerService,
    balanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
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
        {
          provide: BalanceService,
          useFactory: mockBalanceService,
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
    productService = module.get<ProductService>(ProductService);
    customerService = module.get<CustomerService>(CustomerService);
    balanceService = module.get<BalanceService>(BalanceService);
    model = module.get<Model<OrderDocument>>(getModelToken('Order'));
  });

  describe('test create order different scenarios', () => {
    let input: CreateOrderDto;
    beforeEach(() => {
      input = {
        ...mockOrder,
      };
    });

    afterEach(() => {
      jest.restoreAllMocks();
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

    it('create order of product that is out of stock', async () => {
      mockProduct.stock = 80;
      productService.findOne.mockResolvedValue(mockProduct);
      customerService.findOne.mockResolvedValue(mockCustomer);
      input.quantity = 10;
      jest
        .spyOn(service, 'getProductStockDetail')
        .mockResolvedValue([{ paidStock: 80, refundStock: 0 }]);

      await expect(service.create(input)).rejects.toThrowError(
        ForbiddenException,
      );
    });

    it('create order that is higher than user balance', async () => {
      mockProduct.stock = 100;
      productService.findOne.mockResolvedValue(mockProduct);
      customerService.findOne.mockResolvedValue(mockCustomer);
      input.quantity = 10;
      jest
        .spyOn(service, 'getProductStockDetail')
        .mockResolvedValue([{ paidStock: 80, refundStock: 0 }]);
      jest
        .spyOn(service, 'getCustomerPaidOrderBalance')
        .mockResolvedValue([{ totalAmount: 100 }]);
      await expect(service.create(input)).rejects.toThrowError(
        ForbiddenException,
      );
      expect(productService.findOne).toHaveBeenCalledTimes(1);
      expect(productService.findOne).toHaveBeenCalledWith(input.product);
      expect(customerService.findOne).toHaveBeenCalledTimes(1);
      expect(service.getCustomerPaidOrderBalance).toHaveBeenCalledTimes(1);
    });

    it('create successful order', async () => {
      mockProduct.stock = 100;
      productService.findOne.mockResolvedValue(mockProduct);
      customerService.findOne.mockResolvedValue(mockCustomer);
      balanceService.create.mockResolvedValue({});
      input.quantity = 1;
      jest
        .spyOn(service, 'getProductStockDetail')
        .mockResolvedValue([{ paidStock: 80, refundStock: 0 }]);
      jest
        .spyOn(service, 'getCustomerPaidOrderBalance')
        .mockResolvedValue([{ totalAmount: 50 }]);
      await service.create(input);
      expect(productService.findOne).toHaveBeenCalledTimes(1);
      expect(customerService.findOne).toHaveBeenCalledTimes(1);
      expect(balanceService.create).toHaveBeenCalledTimes(1);
      expect(service.getCustomerPaidOrderBalance).toHaveBeenCalledTimes(1);
      expect(model.create).toHaveBeenCalledTimes(1);
    });
  });

  it('refund order that exist in system', async () => {
    jest.spyOn(model, 'findById').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(mockOrder),
    } as any);
    await service.refund('orderId');
    expect(model.findById).toHaveBeenCalledTimes(1);
    expect(model.findById).toHaveBeenCalledWith('orderId');
    expect(balanceService.create).toHaveBeenCalledTimes(1);
  });

  it('delete order by id', async () => {
    const _id = 'testId';
    await service.remove(_id);
    expect(model.remove).toHaveBeenCalledWith({ _id });
  });

  it('get customer expense amount from orders', async () => {
    jest
      .spyOn(service, 'getCustomerPaidOrderBalance')
      .mockResolvedValue([{ totalAmount: 100 }]);
    await service.getExpenseBalance('clientId');
    expect(service.getCustomerPaidOrderBalance).toHaveBeenCalledTimes(1);
  });
});
