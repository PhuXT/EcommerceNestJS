import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, EmailDto } from './dto/create-user.dto';
import { UserRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { User } from './schemas/users.schema';
import { IUser, IUserUpdate } from './entities/user.entity';
import { ROLE_ENUM, STATUS_ENUM } from './users.constant';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  // HASH PASSWORD
  async hashPassword(passwordPlainText, saltOrRounds): Promise<string> {
    return bcrypt.hash(passwordPlainText, saltOrRounds);
  }

  // CREATE
  async create(createUserDto: CreateUserDto): Promise<IUser> {
    createUserDto.password = await this.hashPassword(
      createUserDto.password,
      10,
    );

    const newUserObj = await this.userRepository.create(createUserDto);
    if (!newUserObj) throw new InternalServerErrorException();
    const newUser = newUserObj['_doc'];

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, createdAt, updatedAt, ...newUser2 } = newUser;
    return newUser2;
  }

  // FIND BY EMAIL
  async findOneByEmail(email: EmailDto): Promise<User> {
    const user = await this.userRepository.findOne({ email });
    if (!user) throw new NotFoundException('User not exist');
    return user;
  }

  // FIN AND UPDATE
  async findOneAndUpdate(id, updateUserDto): Promise<IUser> {
    try {
      const userUpdate = await this.userRepository.findOneAndUpdate(
        id,
        updateUserDto,
      );
      return userUpdate;
    } catch (error) {
      console.log(error);
    }
    // return this.userRepository.findOneAndUpdate(id, updateUserDto);
  }

  async find(): Promise<IUser[]> {
    const listUser = await this.userRepository.find({});

    const result = listUser.map((user) => {
      const { password, ...userNotInlcudePass } = user['_doc'];
      return userNotInlcudePass;
    });

    return result;
  }

  // DELETE USER
  async delete(id: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ _id: id });
    if (!user) {
      throw new BadRequestException('User not exist');
    }

    if (user.status === STATUS_ENUM.ACTIVE) {
      throw new BadRequestException('Can not delete user ');
    }

    return this.userRepository.deleteMany({ _id: id });
  }

  // UPDATE USER
  async update(id: string, updateUserDto: IUserUpdate): Promise<IUser> {
    if (updateUserDto.password) {
      updateUserDto.password = await this.hashPassword(
        updateUserDto.password,
        10,
      );
    }

    const userUpdated = await this.findOneAndUpdate({ _id: id }, updateUserDto);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, createdAt, updatedAt, ...userUpdated2 } =
      userUpdated['_doc'];
    return userUpdated2;
  }
}
