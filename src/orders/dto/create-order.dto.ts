import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import mongoose from 'mongoose';

class User {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId: mongoose.Schema.Types.ObjectId;
}

class Item {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  itemName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  itemPrice: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  itemId: mongoose.Schema.Types.ObjectId;
}

export class CreateOrderDto {
  @ApiProperty({ type: [Item] })
  @IsNotEmpty()
  items: Item[];

  @ApiProperty({ type: User })
  @IsNotEmpty()
  user: User;
}
