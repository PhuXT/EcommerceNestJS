import { ApiProperty } from '@nestjs/swagger';
import mongoose, { Document } from 'mongoose';
import { ACTIVE_STATUS_ENUM, ROLE_ENUM } from '../users.constant';

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
  isAdmin: ROLE_ENUM;

  @ApiProperty()
  isActive: ACTIVE_STATUS_ENUM;

  // @ApiProperty()
  // createdAt: Date;

  // @ApiProperty()
  // updatedAt: Date;
}
