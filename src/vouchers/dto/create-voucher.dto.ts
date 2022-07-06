import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsNumberString,
  IsString,
} from 'class-validator';

export class CreateVoucherDto {
  @ApiProperty({ type: Date })
  @IsDateString()
  startTime: Date;

  @ApiProperty()
  @IsDateString()
  endTime: Date;

  @ApiProperty()
  @IsString()
  nameVoucher: string;

  @ApiPropertyOptional()
  @IsString()
  description: string;

  @ApiProperty({ type: Number })
  @IsNumberString()
  quantity: number;

  @ApiProperty({ type: Number })
  @IsNumberString()
  discount: number;

  @ApiProperty({ required: true })
  @IsArray()
  categories: string[];
}
