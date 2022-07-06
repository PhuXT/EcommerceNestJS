import mongoose from 'mongoose';
import { STATUS_ENUM, ROLE_ENUM } from '../users.constant';

export interface IUser {
  _id?: mongoose.Schema.Types.ObjectId;

  userName: string;

  email: string;

  password: string;

  phone?: string;

  address?: string;

  role?: ROLE_ENUM;

  status?: STATUS_ENUM;

  createdAt?: Date;

  updatedAt?: Date;

  __v?: number;
}

export interface IUserUpdate {
  userName?: string;

  email?: string;

  password?: string;

  phone?: string;

  address?: string;

  role?: ROLE_ENUM;

  status?: STATUS_ENUM;
}
