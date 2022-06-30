import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumberString, IsString } from 'class-validator';
import { STATUS_ENUM } from '../categorys.constant';

export class CreateCategoryDto {
  @ApiProperty({ required: true, type: String })
  @IsNotEmpty()
  @IsString()
  categoryName: string;

  @ApiProperty({ required: true })
  image: string;

  @ApiProperty({ default: STATUS_ENUM.INACTIVE })
  status: STATUS_ENUM;

  @ApiProperty({ required: true })
  @IsNumberString()
  priority: number;
}
