import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { STATUS_ENUM } from './categorys.constant';
import { Document } from 'mongoose';

export type CategotyDocument = Category & Document;

@Schema({ timestamps: true })
export class Category {
  @Prop({ required: true, unique: true })
  categoryName: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true, default: STATUS_ENUM.INACTIVE })
  status: STATUS_ENUM;

  @Prop({ required: true, unique: true })
  priority: number;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
