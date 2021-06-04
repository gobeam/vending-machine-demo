import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel('Order') private readonly model: Model<OrderDocument>,
  ) {}

  /**
   * create order
   * @param createOrderDto
   */
  create(createOrderDto: CreateOrderDto): Promise<Order> {
    return this.model.create(createOrderDto);
  }

  /**
   * remove order
   * @param _id
   */
  async remove(_id: string) {
    await this.model.remove({ _id });
  }
}
