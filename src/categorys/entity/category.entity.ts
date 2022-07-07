import { ApiProperty } from '@nestjs/swagger';
import mongoose, { Document } from 'mongoose';
import { STATUS_ENUM } from '../categorys.constant';

export class ICategory extends Document {
  @ApiProperty()
  _id: mongoose.Schema.Types.ObjectId;

  @ApiProperty()
  categoryName: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  status: STATUS_ENUM;

  @ApiProperty()
  priority: number;

  //   @ApiProperty()
  //   createdAt: Date;

  //   @ApiProperty()
  //   updatedAt: Date;
}

export interface ICategoryUpdate {
  status?: STATUS_ENUM;

  priority?: number;

  categoryName?: string;

  image?: string;

  //
  //   createdAt: Date;

  //
  //   updatedAt: Date;
}
