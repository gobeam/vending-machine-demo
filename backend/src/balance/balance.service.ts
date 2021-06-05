import { Injectable } from '@nestjs/common';
import { CreateBalanceDto } from './dto/create-balance.dto';
import { UpdateBalanceDto } from './dto/update-balance.dto';

@Injectable()
export class BalanceService {
  create(createBalanceDto: CreateBalanceDto) {
    return 'This action adds a new balance';
  }

  findAll() {
    return `This action returns all balance`;
  }

  findOne(id: number) {
    return `This action returns a #${id} balance`;
  }

  update(id: number, updateBalanceDto: UpdateBalanceDto) {
    return `This action updates a #${id} balance`;
  }

  remove(id: number) {
    return `This action removes a #${id} balance`;
  }
}
