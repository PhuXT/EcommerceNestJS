import { BadRequestException } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { CreateItemDto } from './dto/create-item.dto';

export type ItemDocument = Item & Document;

@Schema({ _id: false })
class Category {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  name: string;
}

const categorySchema = SchemaFactory.createForClass(Category);

// @Schema()
// class FlashSale {
//   @Prop({ required: true })
//   name: string;

//   @Prop({ required: true, type: Date })
//   startTime: Date;

//   @Prop({ required: true, type: Date })
//   endTime: Date;

//   @Prop({ required: true })
//   quantity: number;

//   @Prop({ required: true })
//   discount: number;
// }

// const FlashSaleSchema = SchemaFactory.createForClass(FlashSale);

@Schema({ timestamps: true })
export class Item {
  @Prop({ required: true, unique: true })
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
  avatarImg: string;

  @Prop({ default: [] })
  detailImgs: string[];

  @Prop({ required: true })
  descriptions: string;

  @Prop({ required: true, type: categorySchema })
  category: Category;

  // @Prop({ default: null, type: FlashSaleSchema })
  // flashSale: FlashSale;

  @Prop({ required: true })
  quantity: number;

  @Prop({ default: 0 })
  stocks: number;

  @Prop({ default: [] })
  tags: string[];
}

export const ItemSchema = SchemaFactory.createForClass(Item);

export interface IItemModel extends Document, CreateItemDto {}

ItemSchema.pre<IItemModel>('save', async function () {
  const category = await this.db
    .collection('categories')
    .findOne({ _id: this.category.id });

  if (!category || category.categoryName !== this.category.name) {
    console.log('Category doesnt exist phan nay chua log ra duoc ne');

    throw new BadRequestException('Category doesnt exist');
  }
});
