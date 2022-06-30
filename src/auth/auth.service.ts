import { Injectable } from '@nestjs/common';
import { CreateUserDto, EmailDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/schemas/users.schema';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/users/entities/user.entity';
import { EmailsService } from 'src/emails/emails.service';
import { ACTIVE_STATUS_ENUM } from 'src/users/users.constant';
import { use } from 'passport';

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
  async login(user: User) {
    if (user.status === ACTIVE_STATUS_ENUM.INACTIVE) {
      return 'You need active account';
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
  async regisrer(createUserDto: CreateUserDto): Promise<IUser> {
    const newUser = await this.usersService.create(createUserDto);
    const payload = { userName: newUser.userName, id: newUser._id };
    const verifyToken = this.jwtService.sign(payload);
    const linkVerify = `http://${process.env.HOST}/api/${process.env.VERSION}/auth/verify?token=${verifyToken}`;
    await this.emailService.sendMessage(newUser.email, linkVerify);
    return newUser;
  }

  async verify(token: string) {
    const isVerify = this.jwtService.verify(token);
    if (!isVerify) {
      return 'Link has been expried';
    }
    const user = this.jwtService.decode(token);

    await this.usersService.findOneAndUpdate(user['id'], {
      status: ACTIVE_STATUS_ENUM.ACTIVE,
    });
    return 'Account actived';
  }
}
