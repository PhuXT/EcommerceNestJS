import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { get } from 'http';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { IUser } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // LOGIN
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
    // return req.user;
  }

  // REGISTER
  @ApiCreatedResponse({ type: IUser, description: 'Return new user' })
  @Post('register')
  async create(@Body() createUserDto: CreateUserDto): Promise<IUser> {
    return this.authService.regisrer(createUserDto);
  }

  // verify
  @Get('verify')
  verify(@Query('token') token: string) {
    return this.authService.verify(token);
  }
}
