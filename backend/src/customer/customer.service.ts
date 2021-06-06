import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer, CustomerDocument } from './entities/customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel('Customer') private readonly model: Model<CustomerDocument>,
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
   * update customer by id
   * @param id
   * @param updateCustomerDto
   */
  async update(
    id: string,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    const customer = await this.model.findById(id).exec();
    if (!customer) {
      throw new NotFoundException('customer not found');
    }
    customer.balance += Number(updateCustomerDto.balance);
    await customer.save();
    return customer;
  }

  /**
   * delete customer by id
   * @param _id
   */
  async remove(_id: string) {
    await this.model.remove({ _id });
  }
}
