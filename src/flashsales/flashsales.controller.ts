import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { FlashsalesService } from './flashsales.service';
import { CreateFlashsaleDto } from './dto/create-flashsale.dto';
import { UpdateFlashsaleDto } from './dto/update-flashsale.dto';
import { IFlashSale } from './entities/flashsale.entity';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/role.guard';
import { ROLE_ENUM } from 'src/users/users.constant';
import { Roles } from 'src/auth/role.decorator';
import {
  BadRequestDto,
  ConFlictExceptionDto,
  InternalServerErrorExceptionDto,
  UnauthorizedExceptionDto,
} from 'src/swangger/swangger.dto';
import {
  FlashSaleSwangger,
  Item,
} from './dto/swangger/flash-sale-swangger.dto';
import { type } from 'os';

@ApiTags('flashsales')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(ROLE_ENUM.ADMIN)
@Controller('flashsales')
@ApiInternalServerErrorResponse({
  type: InternalServerErrorExceptionDto,
  description: 'Server error',
})
@ApiUnauthorizedResponse({
  type: UnauthorizedExceptionDto,
  description: 'login with non-admin rights',
})
export class FlashsalesController {
  constructor(private readonly flashsalesService: FlashsalesService) {}

  // [POST] - create
  @ApiCreatedResponse({
    type: FlashSaleSwangger,
    description: 'Flash sale created',
  })
  @ApiBadRequestResponse({
    type: BadRequestDto,
    description:
      'startTime < Date.now or startTime > endTime, discount invalid, itemId not exist, stocks >= flashSaleQuantity  ',
  })
  @Post()
  create(@Body() createFlashsaleDto: CreateFlashsaleDto): Promise<IFlashSale> {
    return this.flashsalesService.create(createFlashsaleDto);
  }

  @ApiOkResponse({
    type: [FlashSaleSwangger],
    description: 'Return list flash sale',
  })
  // [GET] - findAll()
  @Get()
  findAll(): Promise<IFlashSale[]> {
    return this.flashsalesService.findAll();
  }

  // [GET] - findOne
  @ApiOkResponse({
    type: FlashSaleSwangger,
    description: 'Find one flash sale',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<IFlashSale> {
    return this.flashsalesService.findOne(id);
  }

  // [UPDATE]
  @ApiOkResponse({
    type: FlashSaleSwangger,
    description: 'Return flash sale updated',
  })
  @ApiConflictResponse({
    type: ConFlictExceptionDto,
    description: 'Time update exists',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFlashsaleDto: UpdateFlashsaleDto,
  ) {
    return this.flashsalesService.update(id, updateFlashsaleDto);
  }

  // [DELETE]
  @ApiOkResponse({ type: Boolean, description: 'return boolean' })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<boolean> {
    return this.flashsalesService.remove(id);
  }
}
