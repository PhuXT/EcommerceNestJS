import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import mongoose from 'mongoose';
import { IsEndTime, IsStartTime } from './custom-validator/validator-flashsale';
import { STATUS_FLASHSALE_ENUM } from '../flashsale.constain';

export class CreateFlashsaleDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsEnum(STATUS_FLASHSALE_ENUM)
  @IsOptional()
  status?: STATUS_FLASHSALE_ENUM;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  @IsStartTime({ message: 'start time must be future' })
  startTime: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  @IsEndTime('startTime', {
    message: 'end time is greater than start time',
  })
  endTime: Date;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => flashSaleItemInfor)
  items: [flashSaleItemInfor];
}

export class flashSaleItemInfor {
  @ApiProperty()
  @IsString()
  itemId: mongoose.Schema.Types.ObjectId | string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  discount: number;
}
