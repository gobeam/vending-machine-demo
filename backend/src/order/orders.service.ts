import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Order, OrderDocument, OrderStatus } from './entities/order.entity';
import { ProductService } from '../product/product.service';
import { CustomerService } from '../customer/customer.service';
import { BalanceService } from '../balance/balance.service';
import { BalanceTypeInterface } from '../balance/interfaces/balance-type.interface';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel('Order') private readonly model: mongoose.Model<OrderDocument>,
    private readonly productService: ProductService,
    private readonly customerService: CustomerService,
    private readonly balanceService: BalanceService,
  ) {}

  /**
   * create order
   * @param createOrderDto
   */
  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    let product = await this.productService.findOne(createOrderDto.product);
    if (!product) {
      throw new ForbiddenException('invalid product id supplied');
    }
    let customer = await this.customerService.findOne(createOrderDto.customer);
    if (!customer) {
      throw new ForbiddenException('invalid customer id supplied');
    }
    const orderAmount = product.price * createOrderDto.quantity;
    const customerExpenseBalance = await this.getCustomerPaidOrderBalance(
      createOrderDto.customer,
    );
    let customerBalance = customer.balance;
    if (customerExpenseBalance[0]) {
      customerBalance -= customerExpenseBalance[0].totalAmount;
    }
    if (customerBalance < orderAmount) {
      throw new ForbiddenException('balance not enough');
    }

    const balancePromise = this.balanceService.create({
      amount: orderAmount,
      type: BalanceTypeInterface.CREDIT,
      vendingMachine: createOrderDto.vendingMachine,
    });
    const orderPromise = this.model.create({
      ...createOrderDto,
      amount: orderAmount,
      status: OrderStatus.PAID,
    });
    const [balance, order] = await Promise.all([balancePromise, orderPromise]);
    return order;
  }

  /**
   * Get total amount of customer paid orders
   * @param customer
   */
  async getCustomerPaidOrderBalance(customer: string) {
    return this.model
      .aggregate([
        {
          $match: {
            status: OrderStatus.PAID,
            customer: new mongoose.Types.ObjectId(customer),
          },
        },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: '$amount' },
          },
        },
        {
          $project: {
            _id: 0,
            totalAmount: 1,
          },
        },
      ])
      .exec();
  }

  /**
   * remove order
   * @param _id
   */
  async remove(_id: string) {
    await this.model.remove({ _id });
  }
}
