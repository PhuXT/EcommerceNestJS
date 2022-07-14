import mongoose from 'mongoose';

interface ICategory {
  id: mongoose.Schema.Types.ObjectId;
  name: string;
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
  category: ICategory;
  quantity: number;
  stocks: number;
  tags: string[];
  createdAt?: Date;
  updatedAt?: Date;
  flashSalePrice?: number;
  flashSaleName?: string;
  flashSaleDiscount?: number;
  flashSaleQuantity?: number;
  flashSaleId?: mongoose.Schema.Types.ObjectId;
  sold?: number;
  __v?: string;
}

export interface ICreateItem {
  name: string;
  barCode: string;
  cost: number;
  price: number;
  weight: number;
  avatarImg: string;
  detailImgs?: string[];
  descriptions: string;
  category: ICategory;
  quantity: number;
  tags?: string[];
}

export interface IUpdateItem {
  name?: string;
  barCode?: string;
  cost?: number;
  price?: number;
  weight?: number;
  avatarImg?: string;
  detailImgs?: string[];
  descriptions?: string;
  category?: ICategory;
  quantity?: number;
  tags?: string[];
  stocks?: number;
  sold?: number;
}
