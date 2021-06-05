import { IsIn, IsNotEmpty, IsNumberString } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";
import {PaymentTypeInterface} from "../interfaces/payment-type.interface";

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
  @IsIn([PaymentTypeInterface.COIN, PaymentTypeInterface.CASH])
  paymentType: PaymentTypeInterface;
}
