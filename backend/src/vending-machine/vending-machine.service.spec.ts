import { Test, TestingModule } from '@nestjs/testing';
import { VendingMachineService } from './vending-machine.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  VendingMachine,
  VendingMachineDocument,
} from './entities/vending-machine.entity';

const mockVending = { name: 'test', balance: 100 };

const mockVendingModel = () => ({
  create: jest.fn(),
  find: () => mockVendingModel,
  exec: jest.fn(),
});
describe('VendingMachineService', () => {
  let service: VendingMachineService, model;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VendingMachineService,
        {
          provide: getModelToken('VendingMachine'),
          useFactory: mockVendingModel,
        },
      ],
    }).compile();

    service = module.get<VendingMachineService>(VendingMachineService);
    model = module.get<Model<VendingMachineDocument>>(
      getModelToken('VendingMachine'),
    );
  });

  it('create vending machine', async () => {
    model.create.mockResolvedValue(mockVending);
    const input: VendingMachine = {
      name: 'test',
    };
    const result = await service.create(input);
    expect(model.create).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockVending);
  });

  it('get vending machine list', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce([mockVending]),
    } as any);
    const result = await service.findAll();
    expect(model.find).toHaveBeenCalledTimes(1);
    expect(model.find().exec).toHaveBeenCalledTimes(1);
    expect(result).toEqual([mockVending]);
  });
});
