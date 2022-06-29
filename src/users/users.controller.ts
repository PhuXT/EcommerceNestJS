import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/role.decorator';
import { ROLE_ENUM } from './users.constant';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/role.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_ENUM.ADMIN)
  @Get(':email')
  findOne(@Param('email') email) {
    return this.usersService.findOneByEmail(email);
  }
}
