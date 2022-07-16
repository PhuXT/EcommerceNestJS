import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { EmailDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IUser } from '../users/entities/user.entity';
import { EmailsService } from '../emails/emails.service';
import { STATUS_ENUM } from '../users/users.constant';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private emailService: EmailsService,
  ) {}

  async validateUser(email: EmailDto, pass: string): Promise<unknown> {
    const user = await this.usersService.findOneByEmail(email);
    const isMatch = await bcrypt.compare(pass, user.password);
    if (user && isMatch) {
      const { password, createdAt, updatedAt, ...result } = user['_doc'];
      return result;
    }
    return null;
  }

  async login(user: IUser) {
    if (user.status === STATUS_ENUM.INACTIVE) {
      throw new UnauthorizedException('You need active account');
    }
    const payload = {
      userName: user.userName,
      id: user['_id'].toString(),
      role: user.role,
    };

    return {
      user,
      accessToken: this.jwtService.sign(payload),
    };
  }
  async regisrer(createUserDto: IUser): Promise<IUser> {
    const newUser = await this.usersService.create(createUserDto);
    const payload = { userName: newUser.userName, id: newUser._id };
    const verifyToken = this.jwtService.sign(payload);
    const linkVerify = `http://${process.env.HOST}/api/${process.env.VERSION}/auth/verify?token=${verifyToken}`;
    await this.emailService.sendMessage(newUser.email, linkVerify);

    return newUser;
  }

  async verify(token: string): Promise<string> {
    const isVerify = this.jwtService.verify(token);
    if (!isVerify) {
      throw new BadRequestException('Link has been expried');
    }
    const user = this.jwtService.decode(token);

    await this.usersService.findOneAndUpdate(user['id'], {
      status: STATUS_ENUM.ACTIVE,
    });
    return 'Account actived';
  }
}
