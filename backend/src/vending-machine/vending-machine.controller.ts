import { Controller, Get } from '@nestjs/common';
import { VendingMachineService } from './vending-machine.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('vending-machine')
@Controller('vending-machine')
export class VendingMachineController {
  constructor(private readonly vendingMachineService: VendingMachineService) {}

  @Get()
  findAll() {
    return this.vendingMachineService.findAll();
  }
}
