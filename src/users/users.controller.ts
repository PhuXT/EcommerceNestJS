import { Controller, Get, Body, Patch, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':email')
  findOne(@Param('email') email) {
    console.log('>>>>>>>>>>>>>');

    console.log(email);

    return this.usersService.findOneByEmail(email);
  }
}
