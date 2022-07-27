import { ApiProperty } from '@nestjs/swagger';
import { ROLE_ENUM } from '../../users.constant';

export class UserSwanggerDto {
  @ApiProperty({ type: String })
  _id: string;

  @ApiProperty({ type: String })
  userName: string;

  @ApiProperty({ type: String })
  email: string;

  @ApiProperty({ type: String })
  phone: string;

  @ApiProperty({ type: String })
  address: string;

  @ApiProperty({ type: String })
  status: string;

  @ApiProperty({ enum: ROLE_ENUM, default: ROLE_ENUM.USER })
  role: ROLE_ENUM;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;
}
