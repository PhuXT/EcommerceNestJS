import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ required: true, type: String })
  @IsNotEmpty()
  @IsString()
  userName: string;

  @ApiProperty({ required: true, type: String })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ required: true, type: String })
  @IsString()
  @IsNotEmpty()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @ApiProperty({ required: false, type: String })
  @IsString()
  @MinLength(9)
  @MaxLength(11)
  phone?: string;

  @ApiProperty({ required: false, type: String })
  @IsString()
  address?: string;
}

export class EmailDto {
  @ApiProperty({ type: String })
  @IsEmail()
  @IsString()
  email: string;
}
