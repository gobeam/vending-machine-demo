import { IsNotEmpty, IsString, ValidateIf } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCustomerDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  token: string;

  @ApiPropertyOptional()
  @ValidateIf((object, value) => value)
  balance: number;
}
