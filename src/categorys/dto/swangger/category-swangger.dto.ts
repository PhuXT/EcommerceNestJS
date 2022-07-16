import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import mongoose from 'mongoose';
import { STATUS_ENUM } from 'src/categorys/categorys.constant';

export class CategorySwanggerRespone {
  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  _id: mongoose.Schema.Types.ObjectId;

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  categoryName: string;

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  image: string;

  @ApiProperty({
    enum: STATUS_ENUM,
    required: true,
    default: STATUS_ENUM.INACTIVE,
  })
  @IsNotEmpty()
  @IsEnum(STATUS_ENUM)
  status: STATUS_ENUM;

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsNumber()
  priority: number;

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsDateString()
  createdAt: Date;

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsDateString()
  updatedAt: Date;
}
