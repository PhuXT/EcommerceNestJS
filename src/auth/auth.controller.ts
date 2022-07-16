import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiAcceptedResponse,
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import {
  LoginResponeDto,
  LoginUserDto,
  UserResponeDto,
} from './dto/swangger/auth-swanger.dto';
import { IUser } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import {
  BadRequestDto,
  ConFlictExceptionDto,
  InternalServerErrorExceptionDto,
  UnauthorizedExceptionDto,
} from '../swangger/swangger.dto';

@ApiTags('auth')
@ApiInternalServerErrorResponse({
  type: InternalServerErrorExceptionDto,
  description: 'Server error',
})
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // LOGIN
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginUserDto, description: 'Enter your email and password' })
  @ApiAcceptedResponse({
    type: LoginResponeDto,
    description: 'Login success',
  })
  @ApiBadRequestResponse({
    type: BadRequestDto,
    description:
      'Email, password wrong, email field, password field not empty ',
  })
  @ApiUnauthorizedResponse({
    type: UnauthorizedExceptionDto,
    description: 'Account is not activated',
  })
  @HttpCode(202)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  // REGISTER
  @ApiCreatedResponse({
    type: UserResponeDto,
    description: 'Register success',
  })
  @ApiBadRequestResponse({
    type: BadRequestDto,
    description:
      'userName, email, password not require, incorrect password format',
  })
  @ApiConflictResponse({
    type: ConFlictExceptionDto,
    description: 'Email already exist',
  })
  @Post('register')
  async create(@Body() createUserDto: CreateUserDto): Promise<IUser> {
    return this.authService.regisrer(createUserDto);
  }

  // VERIFY
  @ApiOkResponse({ type: String, description: 'Account actived' })
  @ApiBadRequestResponse({
    type: BadRequestDto,
    description: 'Link has been expried',
  })
  @Get('verify')
  verify(@Query('token') token: string) {
    return this.authService.verify(token);
  }
}
