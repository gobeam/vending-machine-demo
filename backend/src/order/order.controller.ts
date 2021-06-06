import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly ordersService: OrderService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.ordersService.create(createOrderDto);
  }

  @Patch('/:id/refund')
  refund(@Param('id') id: string): Promise<Order> {
    return this.ordersService.refund(id);
  }

  @Get(':id/customer-expense')
  getExpenseBalance(@Param('id') id: string) {
    return this.ordersService.getExpenseBalance(id);
  }

  @Get(':id/customer')
  customerOrder(@Param('id') id: string): Promise<Order[]> {
    return this.ordersService.getCustomerOrder(id);
  }
}
