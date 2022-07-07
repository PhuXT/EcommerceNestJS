import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Model } from 'mongoose';
import { CreateItemDto } from './dto/create-item.dto';

export type ItemDocument = Item & Document;

@Schema({ timestamps: true })
export class Item {
  _id: mongoose.Schema.Types.ObjectId | string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  barCode: string;

  @Prop({ required: true })
  cost: number;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  weight: number;

  @Prop({ required: true })
  imgs: string[];

  @Prop({ required: true })
  descriptions: string;

  @Prop({ default: false })
  isFashSale: boolean;

  @Prop({ required: true })
  categories: string[];

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  stocks: number;

  @Prop({ required: true })
  tags: string;

  createdAt: Date;

  updatedAt: Date;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
