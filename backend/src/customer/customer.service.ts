import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer, CustomerDocument } from './entities/customer.entity';
import { OrderService } from '../order/order.service';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel('Customer') private readonly model: Model<CustomerDocument>
  ) {}

  /**
   * create new customer
   * @param createCustomerDto
   */
  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const customer = await this.model
      .findOne({
        token: createCustomerDto.token,
      })
      .exec();
    if (customer) {
      throw new UnprocessableEntityException({ token: 'user already exists' });
    }
    return this.model.create(createCustomerDto);
  }

  /**
   * get customer by id
   * @param id
   */
  async findOne(id: string): Promise<CustomerDocument> {
    return this.model.findById(id).exec();
  }

  /**
   * get expense balance
   * @param id
   */
  async getExpenseBalance(id: string) {
    let expenseAmount = 0;
    // let result = await this.orderService.getCustomerPaidOrderBalance(id);
    // if (result[0]) {
    //   expenseAmount += result[0]['totalAmount'];
    // }
    return {
      customer: id,
      expenseAmount,
    };
  }

  /**
   * update customer by id
   * @param _id
   * @param updateCustomerDto
   */
  update(_id: string, updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
    return this.model
      .findOneAndUpdate({ _id }, updateCustomerDto, { new: true })
      .exec();
  }

  /**
   * delete customer by id
   * @param _id
   */
  async remove(_id: string) {
    await this.model.remove({ _id });
  }
}
