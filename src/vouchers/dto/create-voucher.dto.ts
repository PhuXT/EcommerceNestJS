import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsNumberString,
  IsString,
} from 'class-validator';

export class CreateVoucherDto {
  @ApiProperty({ type: Date, required: true })
  @IsDateString()
  startTime: Date;

  @ApiProperty({ type: Date, required: true })
  @IsDateString()
  endTime: Date;

  @ApiProperty({ type: String, required: true })
  @IsString()
  nameVoucher: string;

  @ApiProperty({ type: String, required: false })
  @IsString()
  description: string;

  @ApiProperty({ type: Number, required: true })
  @IsNumberString()
  quantity: number;

  @ApiProperty({ type: Number, required: true })
  @IsNumberString()
  discount: number;

  @ApiProperty({ required: true })
  @IsArray()
  categories: string[];
}
