import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
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
  @IsNotEmpty()
  email: string;

  @ApiProperty({ required: true, type: String })
  @IsString()
  @IsNotEmpty()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @MinLength(9)
  @MaxLength(11)
  phone?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  address?: string;
}

export class EmailDto {
  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
