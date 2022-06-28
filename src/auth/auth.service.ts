import { Injectable } from '@nestjs/common';
import { CreateUserDto, EmailDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/schemas/users.schema';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/users/entities/user.entity';
import { EmailsService } from 'src/emails/emails.service';

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
      const { password, createdAt, updatedAt, isActive, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = { userName: user.userName, id: user._id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async regisrer(createUserDto: CreateUserDto): Promise<IUser> {
    const newUser = await this.usersService.create(createUserDto);
    const payload = { userName: newUser.userName, id: newUser._id };
    const verifyToken = this.jwtService.sign(payload);
    const linkVerify = `http://${process.env.HOST}/auth/verify?token=${verifyToken}`;
    const isSended = await this.emailService.verify(newUser.email, linkVerify);
    console.log(isSended);
    return newUser;
  }

  async verify(token: string) {
    const isVerify = this.jwtService.verify(token);
    if (!isVerify) {
      return 'Link has been expried.';
    }
    const user = this.jwtService.decode(token);

    await this.usersService.findOneAndUpdate(user['id'], {
      isActive: true,
    });

    return 'Account actived';
  }
}
