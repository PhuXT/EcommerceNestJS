import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/role.decorator';
import { ROLE_ENUM } from 'src/users/users.constant';
import { IOrder } from './entities/order.entity';
import {
  BadRequestDto,
  InternalServerErrorExceptionDto,
  UnauthorizedExceptionDto,
} from 'src/swangger/swangger.dto';
import { OrderSwanggerDto } from './dto/swangger/order-swangger.dto';

@ApiTags('orders')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiInternalServerErrorResponse({
  type: InternalServerErrorExceptionDto,
  description: 'Server error',
})
@ApiUnauthorizedResponse({
  type: UnauthorizedExceptionDto,
})
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // [POST] create
  @ApiBadRequestResponse({
    type: BadRequestDto,
    description:
      'Item not exist, stocks < quantityOrder, voucher not exist, voucher invalid',
  })
  @ApiCreatedResponse({ type: OrderSwanggerDto })
  @Roles(ROLE_ENUM.ADMIN, ROLE_ENUM.USER)
  @Post()
  create(@Req() req, @Body() createOrderDto: CreateOrderDto): Promise<IOrder> {
    return this.ordersService.create(req.user, createOrderDto);
  }

  // [GET] get all
  @ApiOkResponse({ type: [OrderSwanggerDto] })
  @Roles(ROLE_ENUM.ADMIN)
  @Get()
  findAll(): Promise<IOrder[]> {
    return this.ordersService.findAll();
  }

  // [GET] findOne
  @ApiOkResponse({ type: OrderSwanggerDto })
  @ApiBadRequestResponse({
    type: BadRequestDto,
    description: 'Only get your order',
  })
  @Roles(ROLE_ENUM.ADMIN, ROLE_ENUM.USER)
  @Get(':id')
  findOne(@Param('id') idOrder: string, @Req() req) {
    return this.ordersService.findOne(req.user.id, idOrder);
  }

  @ApiOkResponse({ type: String })
  @ApiBadRequestResponse({
    type: BadRequestDto,
    description: 'Order canceled ',
  })
  @Roles(ROLE_ENUM.ADMIN, ROLE_ENUM.USER)
  @Patch(':id/cancellation')
  cancel(@Param('id') id: string): Promise<string> {
    return this.ordersService.update(id);
  }
}
