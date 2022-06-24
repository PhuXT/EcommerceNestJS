import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, EmailDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { User } from './schemas/users.schema';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  // CREATE
  async create(createUserDto: CreateUserDto): Promise<User> {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(createUserDto.password, saltOrRounds);
    createUserDto.password = hash;
    const newUser = await this.userRepository.createUser(createUserDto);
    if (!newUser) throw new InternalServerErrorException();
    return newUser;
  }

  // FIND BY EMAIL
  async findOneByEmail(email: EmailDto) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new NotFoundException('User not exist');
    return user;
  }

  findAll() {
    return this.userRepository.find({});
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }
}
