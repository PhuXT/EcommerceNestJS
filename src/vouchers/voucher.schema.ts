import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type VoucherDocument = Voucher & Document;

@Schema({ timestamps: true })
export class Voucher {
  _id: mongoose.Schema.Types.ObjectId | string;

  @Prop({ required: true })
  startTime: Date;

  @Prop({ required: true })
  endTime: Date;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  discount: number;

  @Prop({ required: true })
  categories: string[];

  @Prop({ required: true })
  nameVoucher: string;

  @Prop()
  description: string;

  createdAt: Date;

  updatedAt: Date;
}

export const VoucherSchema = SchemaFactory.createForClass(Voucher);
