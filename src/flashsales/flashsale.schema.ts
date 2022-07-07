import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { STATUS_FLASHSALE_ENUM } from './flashsale.constain';

export type FlashSaleDocument = FlashSale & Document;

@Schema({ _id: false })
export class Items {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  itemId: mongoose.Schema.Types.ObjectId | string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true, default: 20 })
  discount: number;
}
const ItemsSchema = SchemaFactory.createForClass(Items);

@Schema({ timestamps: true })
export class FlashSale {
  // _id: mongoose.Schema.Types.ObjectId;

  @Prop()
  name: string;

  @Prop({ required: true, default: STATUS_FLASHSALE_ENUM.INACTIVE })
  status: STATUS_FLASHSALE_ENUM;

  @Prop({ type: [ItemsSchema] })
  items: [Items];

  @Prop()
  startTime: Date;

  @Prop()
  endTime: Date;

  // createdAt: Date;

  // updatedAt: Date;
}

export const FlashSaleSchema = SchemaFactory.createForClass(FlashSale);

// ItemsSchema.pre('save', (next) => {
//   console.log(this['subpaths']);

//   console.log(1);
// });
