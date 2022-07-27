import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Roles } from '../auth/role.decorator';
import { ROLE_ENUM } from './users.constant';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/role.guard';
import { IUser } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  InternalServerErrorExceptionDto,
  UnauthorizedExceptionDto,
} from '../swangger/swangger.dto';
import { UserSwanggerDto } from './dto/swangger/user.swangger';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiInternalServerErrorResponse({
  type: InternalServerErrorExceptionDto,
  description: 'Server error',
})
@ApiUnauthorizedResponse({
  type: UnauthorizedExceptionDto,
  description: 'need login',
})
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // [GET] api/v1/users'
  @ApiOkResponse({ type: UserSwanggerDto })
  @Roles(ROLE_ENUM.ADMIN)
  @Get()
  getAll(): Promise<IUser[]> {
    return this.usersService.find();
  }

  // [Delete] api/v1/users/:id
  @ApiOkResponse({ type: Boolean })
  @Roles(ROLE_ENUM.ADMIN)
  @Delete(':id')
  delete(@Param('id') id: string): Promise<boolean> {
    return this.usersService.delete(id);
  }

  // [Patch] api/v1/users
  @ApiOkResponse({ type: UserSwanggerDto })
  @Roles(ROLE_ENUM.ADMIN, ROLE_ENUM.USER)
  @Patch('')
  updateInfo(
    @Request() req,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<IUser> {
    return this.usersService.update(req.user.id, updateUserDto);
  }
}
