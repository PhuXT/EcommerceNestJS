import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { ItemSchema } from 'src/items/item.schema';

export type OrderDocument = Order & Document;

// Item Schema
@Schema({ _id: false })
class Item {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  itemId: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  itemName: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  itemPrice: number;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  flashSaleId: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  flashSaleName: string;

  @Prop({ required: true })
  flashDiscount: number;
}
const itemSchema = SchemaFactory.createForClass(Item);

// User Schema

@Schema({ _id: false })
class User {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  userId: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  userName: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  address: string;
}
const UserSchema = SchemaFactory.createForClass(User);

// Voucher Schema
@Schema({ _id: false })
class Voucher {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  voucherId: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  voucherName: string;

  @Prop({ required: true })
  voucherDiscount: number;

  @Prop({ required: true })
  applyCategories: string[];
}
const VoucherSchema = SchemaFactory.createForClass(Voucher);

// Main Schema ( ORDER SCHEMA)
@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true })
  totalPrice: number;

  @Prop({ required: true })
  originPrice: number;

  @Prop({ required: true, type: ItemSchema })
  items: Item;

  @Prop({ required: true, type: UserSchema })
  user: User;

  @Prop({ required: true, type: VoucherSchema })
  voucher: Voucher;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
