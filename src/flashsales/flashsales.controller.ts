import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FlashsalesService } from './flashsales.service';
import { CreateFlashsaleDto } from './dto/create-flashsale.dto';
import { UpdateFlashsaleDto } from './dto/update-flashsale.dto';
import { IFlashSale } from './entities/flashsale.entity';

@Controller('flashsales')
export class FlashsalesController {
  constructor(private readonly flashsalesService: FlashsalesService) {}

  @Post()
  create(@Body() createFlashsaleDto: CreateFlashsaleDto): Promise<IFlashSale> {
    return this.flashsalesService.create(createFlashsaleDto);
  }

  @Get()
  findAll(): Promise<IFlashSale[]> {
    return this.flashsalesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.flashsalesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFlashsaleDto: UpdateFlashsaleDto,
  ) {
    return this.flashsalesService.update(id, updateFlashsaleDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.flashsalesService.remove(+id);
  // }
}