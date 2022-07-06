import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({ required: true, type: String })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  userName?: string;

  @ApiPropertyOptional({ required: true, type: String })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @MinLength(9)
  @MaxLength(11)
  phone?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  address?: string;

  // @ApiPropertyOptional()
  // @IsEnum(ROLE_ENUM)
  // @IsOptional()
  // role?: ROLE_ENUM;

  // @ApiPropertyOptional()
  // @IsEnum(STATUS_ENUM)
  // @IsOptional()
  // status?: STATUS_ENUM;
}
