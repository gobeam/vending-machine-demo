import { IsIn, IsNotEmpty, IsNumberString } from 'class-validator';
import { PaymentType } from '../entities/order.entity';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumberString()
  quantity: number;

  @IsNotEmpty()
  product: string;

  @IsNotEmpty()
  customer: string;

  @IsNotEmpty()
  vendingMachine: string;

  @IsIn([PaymentType.COIN, PaymentType.CASH])
  paymentType: PaymentType;
}
