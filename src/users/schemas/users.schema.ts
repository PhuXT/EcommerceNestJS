import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @ApiProperty()
  _id: mongoose.Schema.Types.ObjectId | string;

  @ApiProperty()
  @Prop({ required: true })
  userName: string;

  @ApiProperty()
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @ApiProperty()
  @Prop({ default: '' })
  phone: string;

  @ApiProperty()
  @Prop({ default: '' })
  address: string;

  @ApiProperty()
  @Prop({ default: false })
  isAdmin: boolean;

  @ApiProperty()
  @Prop({ default: false })
  isActive: boolean;

  // @ApiProperty()
  createdAt: Date;

  // @ApiProperty()
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
