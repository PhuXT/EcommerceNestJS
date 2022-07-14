import mongoose from 'mongoose';

export class Order {}
export interface CreateItemOrder {
  _id?: mongoose.Schema.Types.ObjectId;
  name: string;
  barCode: string;
  price: number;
  flashSaleName?: string;
  flashSaleDiscount?: number;
  stocksUpdate?: number;
  flashSaleQuantityUpdate?: number;
  totalPrice?: number;
  amountOrder?: number;
  originPrice?: number;
  voucherDiscount?: number;
  codeVoucher?: string;
  voucehrId?: mongoose.Schema.Types.ObjectId;
  flashSaleId?: mongoose.Schema.Types.ObjectId;
}

export interface UserOrder {
  userId?: mongoose.Schema.Types.ObjectId;
  userName?: string;
  phone: string;
  address: string;
}
