import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { VendingMachineService } from '../vending-machine.service';

@Injectable()
export class VendingMachineSeed {
  constructor(private readonly service: VendingMachineService) {}

  @Command({
    command: 'seed:vend',
    describe: 'seed vending machine',
    autoExit: true,
  })
  async create() {
    const vend = await this.service.create({
      name: 'test-vending',
      balance: 100,
    });
    console.log(vend);
  }
}
