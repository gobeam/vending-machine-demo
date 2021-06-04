import {IsNotEmpty, IsNumberString} from "class-validator";

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
}
