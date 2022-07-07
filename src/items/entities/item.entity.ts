import mongoose, { Document } from 'mongoose';

interface ICategory {
  id: mongoose.Schema.Types.ObjectId;
  name: string;
}

interface IFlashSale {
  name: string;
  startTime: Date;
  endTime: Date;
  quantity: number;
  discount: number;
}

export interface IItem {
  _id?: mongoose.Schema.Types.ObjectId;
  name: string;
  barCode: string;
  cost: number;
  price: number;
  weight: number;
  avatarImg: string;
  detailImgs?: string[];
  descriptions: string;
  categories: ICategory;
  flashSale: IFlashSale | null;
  quantity: number;
  stocks: number;
  tags: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
