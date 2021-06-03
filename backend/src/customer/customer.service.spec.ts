import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from './customer.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CustomerDocument } from './entities/customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UnprocessableEntityException } from '@nestjs/common';
import { UpdateCustomerDto } from './dto/update-customer.dto';

const mockCustomer = { token: 'tester', balance: 100 };
const mockCustomerModel = () => ({
  remove: jest.fn(),
  findOne: jest.fn(),
  findOneAndUpdate: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  insertMany: jest.fn(),
  exec: jest.fn(),
});

describe('CustomerService', () => {
  let service: CustomerService, model;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        {
          provide: getModelToken('Customer'),
          useFactory: mockCustomerModel,
        },
      ],
    }).compile();

    service = module.get<CustomerService>(CustomerService);
    model = module.get<Model<CustomerDocument>>(getModelToken('Customer'));
  });

  describe('test create customer', () => {
    let input: CreateCustomerDto;
    beforeEach(() => {
      input = mockCustomer;
    });
    it('create a customer with duplicate token', async () => {
      jest.spyOn(model, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(mockCustomer),
      } as any);
      await expect(service.create(input)).rejects.toThrowError(
        UnprocessableEntityException,
      );
    });
    it('create a customer with unique token', async () => {
      jest.spyOn(model, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(null),
      } as any);
      model.create.mockResolvedValue(mockCustomer);
      const result = await service.create(input);
      expect(model.findOne).toHaveBeenCalledTimes(1);
      expect(model.findOne).not.toThrowError();
      expect(model.create).toHaveBeenCalledWith(input);
    });
  });

  it('get customer by id', async () => {
    const id = 'testId';
    jest.spyOn(model, 'findById').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(mockCustomer),
    } as any);
    await service.findOne(id);
    expect(model.findById).toHaveBeenCalledWith(id);
    expect(model.findById(id).exec).toHaveBeenCalledTimes(1);
  });

  it('update customer by id', async () => {
    const _id = 'testId';
    let input: UpdateCustomerDto = {
      token: 'tester',
      balance: 50,
    };
    jest.spyOn(model, 'findOneAndUpdate').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce([input]),
    } as any);
    await service.update(_id, input);
    expect(model.findOneAndUpdate).toHaveBeenCalledWith({ _id }, input, {
      new: true,
    });
    expect(model.findOneAndUpdate({ _id }, input).exec).toHaveBeenCalledTimes(
      1,
    );
  });

  it('delete customer by id', async () => {
    const _id = 'testId';
    await service.remove(_id);
    expect(model.remove).toHaveBeenCalledWith({ id: _id });
  });
});
