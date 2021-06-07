import { IsIn, IsNotEmpty, IsNumberString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaymentTypeInterface } from '../interfaces/payment-type.interface';
import { IsObjectId } from '../../common/decorators/valid-mongo-id.decorator';

export class CreateOrderDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  quantity: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsObjectId({ message: 'invalid id' })
  product: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsObjectId({ message: 'invalid id' })
  customer: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsObjectId({ message: 'invalid id' })
  vendingMachine: string;

  @ApiProperty()
  @IsIn([PaymentTypeInterface.COIN, PaymentTypeInterface.CASH])
  paymentType: PaymentTypeInterface;
}
