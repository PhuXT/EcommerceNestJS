import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  categoryName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  image: string;
}
