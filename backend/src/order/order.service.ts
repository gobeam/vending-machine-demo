import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Order, OrderDocument } from './entities/order.entity';
import { ProductService } from '../product/product.service';
import { CustomerService } from '../customer/customer.service';
import { BalanceService } from '../balance/balance.service';
import { BalanceTypeInterface } from '../balance/interfaces/balance-type.interface';
import {OrderStatusInterface} from "./interfaces/order-status.interface";

@Injectable()
export class OrderService {
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
      status: OrderStatusInterface.PAID,
    });
    const [balance, order] = await Promise.all([balancePromise, orderPromise]);
    return order;
  }

  /**
   * refund order
   * @param id
   */
  async refund(id: string): Promise<Order> {
    let order = await this.model.findById(id).exec();
    if (order.status === OrderStatusInterface.REFUND) {
      throw new ForbiddenException('order already refunded');
    }
    order.status = OrderStatusInterface.REFUND;
    await order.save();
    await this.balanceService.create({
      amount: order.amount,
      type: BalanceTypeInterface.DEBIT,
      vendingMachine: order.vendingMachine,
    });
    return order;
  }

  /**
   * get expense balance
   * @param id
   */
  async getExpenseBalance(id: string) {
    let expenseAmount = 0;
    let result = await this.getCustomerPaidOrderBalance(id);
    if (result[0]) {
      expenseAmount += result[0]['totalAmount'];
    }
    return {
      customer: id,
      expenseAmount,
    };
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
            status: OrderStatusInterface.PAID,
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
