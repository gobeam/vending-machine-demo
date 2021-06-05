import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import { Balance, BalanceDocument } from './entities/balance.entity';

@Injectable()
export class BalanceService {
  constructor(
    @InjectModel('Balance') private readonly model: Model<BalanceDocument>,
  ) {}

  /**
   * add new balance
   * @param createBalanceDto
   */
  create(createBalanceDto: Balance): Promise<Balance> {
    return this.model.create(createBalanceDto);
  }

  /**
   * get balance of vending machine by id
   * @param id
   */
  async getBalance(id: string) {
    let debitAmount: number = 0;
    let creditAmount: number = 0;
    const result = await this.model.aggregate([
      {
        $match: {
          vendingMachine: new mongoose.Types.ObjectId(id),
        },
      },
      {
        $group: {
          _id: null,
          creditAmount: {
            $sum: {
              $cond: [{ $eq: ['$type', 'credit'] }, '$amount', 0],
            },
          },
          debitAmount: {
            $sum: {
              $cond: [{ $eq: ['$type', 'debit'] }, '$amount', 0],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          creditAmount: 1,
          debitAmount: 1,
        },
      },
    ]).exec();
    if (result[0]) {
      debitAmount += result[0]['debitAmount'];
      creditAmount += result[0]['creditAmount'];
    }
    return {
      debitAmount,
      creditAmount,
    };
  }
}
