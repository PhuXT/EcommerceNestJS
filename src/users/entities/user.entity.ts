import { ApiProperty } from '@nestjs/swagger';
import mongoose, { Document } from 'mongoose';

export class IUser extends Document {
  @ApiProperty()
  _id: mongoose.Schema.Types.ObjectId;

  @ApiProperty()
  userName: string;

  @ApiProperty()
  email: string;

  // @ApiProperty()
  // password: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  isAdmin: boolean;

  @ApiProperty()
  isActive: boolean;

  // @ApiProperty()
  // createdAt: Date;

  // @ApiProperty()
  // updatedAt: Date;
}
