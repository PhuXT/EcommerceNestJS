import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class CreateItemDto {
  @ApiProperty({ required: true, type: String })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ required: true, type: String })
  @IsNotEmpty()
  @IsString()
  barCode: string;

  @ApiProperty({ required: true, type: Number })
  @IsNotEmpty()
  @IsNumberString()
  cost: number;

  @ApiProperty({ required: true, type: Number })
  @IsNotEmpty()
  @IsNumberString()
  price: number;

  @ApiProperty({ required: true, type: Number })
  @IsNotEmpty()
  @IsNumberString()
  weight: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsArray()
  imgs: string[];

  @ApiProperty({ required: true, type: String })
  @IsNotEmpty()
  @IsString()
  descriptions: string;

  //   @ApiProperty({ required: true, type: Boolean })
  //   @IsNotEmpty()
  //   @IsBoolean()
  //   isFashSale: boolean;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsArray()
  categories: string[];

  @ApiProperty({ required: true, type: Number })
  @IsNotEmpty()
  @IsNumberString()
  quantity: number;

  //   @ApiProperty({ required: true, type: Number })
  //   @IsNotEmpty()
  //   @IsNumberString()
  //   stocks: number;

  @ApiProperty({ required: true, type: String })
  @IsNotEmpty()
  @IsString()
  tags: string;
}
