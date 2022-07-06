import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { STATUS_ENUM, ROLE_ENUM } from '../users.constant';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop()
  userName: string;

  @Prop({ unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: '' })
  phone: string;

  @Prop({ default: '' })
  address: string;

  @Prop({ enum: ROLE_ENUM, default: ROLE_ENUM.USER })
  role: ROLE_ENUM;

  @Prop({ enum: STATUS_ENUM, default: STATUS_ENUM.INACTIVE })
  status: STATUS_ENUM;

  createdAt: Date;

  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
