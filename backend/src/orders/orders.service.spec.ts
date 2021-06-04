import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';

const mockOrder = {
  customer: 'customerId',
  product: 'productId',
  vendingMachine: 'vendingId',
  quantity: 1,
};
const mockOrderModel = () => ({
  create: jest.fn(),
  remove: jest.fn(),
  exec: jest.fn(),
});

describe('OrdersService', () => {
  let service: OrdersService, model;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: getModelToken('Order'),
          useFactory: mockOrderModel,
        },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    model = module.get<Model<OrderDocument>>(getModelToken('Order'));
  });

  it('create order', async () => {
    const input: CreateOrderDto = mockOrder;
    await service.create(input);
    expect(model.create).toHaveBeenCalledWith(input);
  });

  it('delete order by id', async () => {
    const _id = 'testId';
    await service.remove(_id);
    expect(model.remove).toHaveBeenCalledWith({ _id });
  });
});
