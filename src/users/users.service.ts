import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, EmailDto } from './dto/create-user.dto';
import { UserRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { User } from './schemas/users.schema';
import { IUser } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  // CREATE
  async create(createUserDto: CreateUserDto): Promise<IUser> {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(createUserDto.password, saltOrRounds);
    createUserDto.password = hash;
    const newUserObj = await this.userRepository.createUser(createUserDto);
    if (!newUserObj) throw new InternalServerErrorException();
    const newUser = newUserObj['_doc'];
    const { password, createdAt, updatedAt, ...newUser2 } = newUser;
    return newUser2;
  }

  // FIND BY EMAIL
  async findOneByEmail(email: EmailDto): Promise<User> {
    const user = await this.userRepository.findOne({ email });
    if (!user) throw new NotFoundException('User not exist');
    return user;
  }

  findAll() {
    return this.userRepository.find({});
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  findOneAndUpdate(id, updateUserDto) {
    return this.userRepository.findOneAndUpdate(id, updateUserDto);
  }
}
