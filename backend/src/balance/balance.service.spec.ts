import { Test, TestingModule } from '@nestjs/testing';
import { BalanceService } from './balance.service';
import { BalanceTypeInterface } from './interfaces/balance-type.interface';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BalanceDocument } from './entities/balance.entity';

const mockBalance = {
  amount: 100,
  type: BalanceTypeInterface.CREDIT,
  vendingMachine: 'vendingMachineId',
};
const mockBalanceModel = () => ({
  create: jest.fn(),
  aggregate: jest.fn(),
  exec: jest.fn(),
});

describe('BalanceService', () => {
  let service: BalanceService, model;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BalanceService,
        {
          provide: getModelToken('Balance'),
          useFactory: mockBalanceModel,
        },
      ],
    }).compile();

    service = module.get<BalanceService>(BalanceService);
    model = module.get<Model<BalanceDocument>>(getModelToken('Balance'));
  });

  it('create balance', async () => {
    await service.create(mockBalance);
    expect(model.create).toHaveBeenCalledWith(mockBalance);
    expect(model.create).toHaveBeenCalledTimes(1);
  });

  it('get balance', async () => {
    jest.spyOn(model, 'aggregate').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce([]),
    } as any);
    await service.getBalance('60b8c2163a53077270b63812');
    expect(model.aggregate).toHaveBeenCalledTimes(1);
    expect(model.aggregate().exec).toHaveBeenCalledTimes(1);
  });
});
