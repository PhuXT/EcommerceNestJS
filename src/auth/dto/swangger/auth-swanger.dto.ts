import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ROLE_ENUM, STATUS_ENUM } from '../../../users/users.constant';

// Login DTO
export class LoginUserDto {
  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  password: string;
}

// LOGIN RESPONE
export class UserResponeDto {
  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  _id: string;

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  userName: string;

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({ enum: STATUS_ENUM, required: true })
  @IsNotEmpty()
  @IsEnum(STATUS_ENUM)
  status: STATUS_ENUM;

  @ApiProperty({ enum: ROLE_ENUM, required: true })
  @IsNotEmpty()
  @IsEnum(ROLE_ENUM)
  role: ROLE_ENUM;
}

export class LoginResponeDto {
  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  accessToken: string;

  @ApiProperty({ type: UserResponeDto, required: true })
  @IsNotEmpty()
  user: UserResponeDto;
}
