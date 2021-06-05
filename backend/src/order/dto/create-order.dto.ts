import { IsIn, IsNotEmpty, IsNumberString } from 'class-validator';
import { PaymentType } from '../entities/order.entity';
import {ApiProperty} from "@nestjs/swagger";

export class CreateOrderDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  quantity: number;

  @ApiProperty()
  @IsNotEmpty()
  product: string;

  @ApiProperty()
  @IsNotEmpty()
  customer: string;

  @ApiProperty()
  @IsNotEmpty()
  vendingMachine: string;

  @ApiProperty()
  @IsIn([PaymentType.COIN, PaymentType.CASH])
  paymentType: PaymentType;
}
