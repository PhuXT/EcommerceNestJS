import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
} from 'class-validator';
import { STATUS_ENUM } from '../categorys.constant';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(STATUS_ENUM)
  @IsOptional()
  status?: STATUS_ENUM;

  @ApiProperty()
  @IsNumberString()
  @IsNotEmpty()
  @IsOptional()
  priority?: number;
}
