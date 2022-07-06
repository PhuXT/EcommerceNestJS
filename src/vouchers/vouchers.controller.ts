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
import { VouchersService } from './vouchers.service';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { IVoucher } from './entities/voucher.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/role.decorator';
import { ROLE_ENUM } from 'src/users/users.constant';

@ApiTags('vouchers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(ROLE_ENUM.ADMIN)
@Controller('vouchers')
export class VouchersController {
  constructor(private readonly vouchersService: VouchersService) {}

  @ApiCreatedResponse({ description: 'Return new voucher' })
  @Post()
  create(@Body() createVoucherDto: CreateVoucherDto): Promise<IVoucher> {
    return this.vouchersService.create(createVoucherDto);
  }

  @ApiOkResponse({ description: 'Return list voucher' })
  @Get()
  findAll(): Promise<IVoucher[]> {
    return this.vouchersService.findAll();
  }

  @ApiOkResponse({ description: 'Return voucher finded by id' })
  @Get(':voucherId')
  findOne(@Param('voucherId') voucherId: string): Promise<IVoucher> {
    return this.vouchersService.findOne(voucherId);
  }

  @ApiOkResponse({ description: 'Return voucher updated' })
  @Patch(':voucherId')
  update(
    @Param('voucherId') voucherId: string,
    @Body() updateVoucherDto: UpdateVoucherDto,
  ) {
    return this.vouchersService.update(voucherId, updateVoucherDto);
  }

  @ApiOkResponse({ type: Boolean, description: 'Return status delete voucher' })
  @Delete(':voucherId')
  remove(@Param('voucherId') voucherId: string): Promise<boolean> {
    return this.vouchersService.remove(voucherId);
  }
}
