import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { Document } from 'mongoose';
import { ACTIVE_STATUS_ENUM, ROLE_ENUM } from '../users.constant';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  _id: mongoose.Schema.Types.ObjectId | string;

  @Prop({ required: true })
  userName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: '' })
  phone: string;

  @Prop({ default: '' })
  address: string;

  @Prop({ default: ROLE_ENUM.USER })
  role: ROLE_ENUM;

  @Prop({ default: ACTIVE_STATUS_ENUM.INACTIVE })
  status: ACTIVE_STATUS_ENUM;

  createdAt: Date;

  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
