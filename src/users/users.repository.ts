import { BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from '../database/entity.repository';
import { CreateUserDto, EmailDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/users.schema';

export class UserRepository extends EntityRepository<UserDocument> {
  constructor(@InjectModel(User.name) userModel: Model<UserDocument>) {
    super(userModel);
  }

  findByEmail(email: EmailDto): Promise<User> {
    return this.findOne({ email });
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> | null {
    try {
      const user = await this.create(createUserDto);
      return user;
    } catch (error) {
      throw new BadRequestException('Email already exist');
    }
    return null;
  }
}
