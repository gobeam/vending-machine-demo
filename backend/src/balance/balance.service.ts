import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Balance, BalanceDocument } from './entities/balance.entity';

@Injectable()
export class BalanceService {
  constructor(
    @InjectModel('Balance') private readonly model: Model<BalanceDocument>,
  ) {}

  create(createBalanceDto: Balance): Promise<Balance> {
    return this.model.create(createBalanceDto);
  }

  findAll() {
    return `This action returns all balance`;
  }

  findOne(id: number) {
    return `This action returns a #${id} balance`;
  }

  update(id: number, updateBalanceDto: Partial<Balance>) {
    return `This action updates a #${id} balance`;
  }

  remove(id: number) {
    return `This action removes a #${id} balance`;
  }
}
