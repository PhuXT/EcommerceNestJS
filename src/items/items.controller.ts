import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
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
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/role.guard';
import { IItem } from './entities/item.entity';
import { SORT_ENUM } from '../database/database.contant';
import {
  BadRequestDto,
  ConFlictExceptionDto,
  InternalServerErrorExceptionDto,
  UnauthorizedExceptionDto,
} from '../swangger/swangger.dto';
import { Roles } from '../auth/role.decorator';
import { ROLE_ENUM } from '../users/users.constant';
import { ItemSwangger } from './dto/swangger/item-swangger.dto';

@ApiTags('items')
@ApiInternalServerErrorResponse({
  type: InternalServerErrorExceptionDto,
  description: 'Server error',
})
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  // [POST] create
  @ApiCreatedResponse({
    type: ItemSwangger,
    description: 'return item created',
  })
  @ApiConflictResponse({
    type: ConFlictExceptionDto,
    description: 'Email or barcode already exist',
  })
  @ApiBadRequestResponse({
    type: BadRequestDto,
    description: 'name, barcode, cost, price, image not empty',
  })
  @ApiUnauthorizedResponse({
    type: UnauthorizedExceptionDto,
    description: 'login with non-admin rights',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_ENUM.ADMIN)
  @Post()
  create(@Body() createItemDto: CreateItemDto): Promise<IItem> {
    return this.itemsService.create(createItemDto);
  }

  // [GET] findall
  @ApiOkResponse()
  // @Roles(ROLE_ENUM.ADMIN, ROLE_ENUM.USER)
  @ApiOkResponse({ type: [ItemSwangger], description: 'return list items' })
  @Get('')
  findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('sortBy') sortBy?: string,
    @Query('options') options?: SORT_ENUM,
  ): Promise<IItem[]> {
    return this.itemsService.findAll(page, limit, sortBy, options);
  }

  // [GET] findOne
  @ApiOkResponse({ type: ItemSwangger, description: 'return items' })
  @ApiBadRequestResponse({
    type: BadRequestDto,
    description: 'Items not exist or id not format objId',
  })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IItem> | null {
    return this.itemsService.findOne(id);
  }

  // [PATCH] update
  @ApiOkResponse({ type: ItemSwangger, description: 'return item updated' })
  @ApiConflictResponse({
    type: ConFlictExceptionDto,
    description: 'Name item or barcode already exist',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_ENUM.ADMIN)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateItemDto: UpdateItemDto,
  ): Promise<IItem> {
    return this.itemsService.update(id, updateItemDto);
  }

  // DELETE
  @ApiOkResponse({ type: Boolean, description: 'return booean' })
  @ApiBadRequestResponse({
    type: BadRequestDto,
    description: 'Item sold > 0 ,Id not format objId',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_ENUM.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<boolean> {
    return this.itemsService.remove(id);
  }
}
