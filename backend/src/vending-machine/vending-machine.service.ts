import { Injectable } from '@nestjs/common';
import { CreateVendingMachineDto } from './dto/create-vending-machine.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VendingMachine } from './entities/vending-machine.entity';

@Injectable()
export class VendingMachineService {
  constructor(
    @InjectModel('VendingMachine')
    private readonly model: Model<VendingMachine>,
  ) {}

  /**
   * Create new vending Machine
   * @param createVendingMachineDto
   */
  create(createVendingMachineDto: CreateVendingMachineDto) {
    return this.model.create(createVendingMachineDto);
  }

  /**
   * get all vending machine
   */
  findAll() {
    return this.model.find().exec();
  }
}
