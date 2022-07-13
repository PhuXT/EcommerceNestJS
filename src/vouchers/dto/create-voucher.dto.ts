import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
  Max,
  Min,
} from 'class-validator';
import {
  IsEndTime,
  IsStartTime,
} from 'src/flashsales/dto/custom-validator/validator-flashsale';

export class CreateVoucherDto {
  @ApiProperty({ type: Date })
  @IsStartTime({ message: 'start time must be future' })
  @IsDateString()
  startTime: Date;

  @ApiProperty()
  @IsEndTime('startTime', {
    message: 'end time is greater than start time',
  })
  @IsDateString()
  endTime: Date;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nameVoucher: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiPropertyOptional()
  @IsString()
  description: string;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  @Min(0)
  @Max(100)
  discount: number;

  @ApiProperty({ required: true })
  @IsArray()
  categories: string[];
}
