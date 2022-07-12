import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsNumberString,
  IsString,
} from 'class-validator';
import {
  IsEndTime,
  IsStartTime,
} from 'src/flashsales/dto/custom-validator/validator-flashsale';

export class CreateVoucherDto {
  @ApiProperty({ type: Date })
  @IsStartTime({ message: 'start time must be future and hours like 10:00' })
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
