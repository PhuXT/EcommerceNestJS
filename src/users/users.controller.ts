import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/role.decorator';
import { ROLE_ENUM } from './users.constant';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/role.guard';
import { IUser } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // [GET] api/v1/users
  @Roles(ROLE_ENUM.ADMIN)
  @Get()
  getAll(): Promise<IUser[]> {
    return this.usersService.find();
  }

  // [Delete] api/v1/users/:id
  @Roles(ROLE_ENUM.ADMIN)
  @Delete(':id')
  delete(@Param('id') id: string): Promise<boolean> {
    return this.usersService.delete(id);
  }

  // [Patch] api/v1/users
  @Roles(ROLE_ENUM.ADMIN, ROLE_ENUM.USER)
  @Patch('')
  updateInfo(
    @Request() req,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<IUser> {
    return this.usersService.update(req.user.id, updateUserDto);
  }
}
