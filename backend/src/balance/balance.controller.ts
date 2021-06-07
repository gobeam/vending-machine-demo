import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BalanceService } from './balance.service';

@ApiTags('balance')
@Controller('balance')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @Get(':id/vending-machine')
  getBalance(@Param('id') id: string) {
    return this.balanceService.getBalance(id);
  }
}
