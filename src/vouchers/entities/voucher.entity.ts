import { ApiProperty } from '@nestjs/swagger';
import mongoose, { Document } from 'mongoose';

export class IVoucher extends Document {
  @ApiProperty()
  _id: mongoose.Schema.Types.ObjectId;

  @ApiProperty()
  startTime: Date;

  @ApiProperty()
  endTime: Date;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  discount: number;

  @ApiProperty()
  categories: string[];

  @ApiProperty()
  nameVoucher: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
