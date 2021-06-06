import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { VendingMachineService } from '../vending-machine.service';
import { BalanceService } from '../../balance/balance.service';
import { BalanceTypeInterface } from '../../balance/interfaces/balance-type.interface';

@Injectable()
export class VendingMachineSeed {
  constructor(
    private readonly service: VendingMachineService,
    private readonly balanceService: BalanceService,
  ) {}

  @Command({
    command: 'seed:vend',
    describe: 'seed vending machine',
    autoExit: true,
  })
  async create() {
    const vend = await this.service.create({
      name: 'test-vending',
    });
    if (vend) {
      await this.balanceService.create({
        vendingMachine: vend._id,
        type: BalanceTypeInterface.CREDIT,
        amount: 100,
      });
    }
    console.log(vend);
  }
}
