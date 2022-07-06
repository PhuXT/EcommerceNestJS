import { ApiProperty } from '@nestjs/swagger';
import mongoose, { Document } from 'mongoose';

export class IItem extends Document {
  @ApiProperty()
  _id: mongoose.Schema.Types.ObjectId;

  @ApiProperty()
  name: string;

  @ApiProperty()
  barCode: string;

  @ApiProperty()
  cost: number;

  @ApiProperty()
  price: number;

  @ApiProperty()
  weight: number;

  @ApiProperty()
  imgs: string[];

  @ApiProperty()
  descriptions: string;

  @ApiProperty()
  isFashSale: boolean;

  @ApiProperty()
  categories: string[];

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  stocks: number;

  @ApiProperty()
  tags: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
