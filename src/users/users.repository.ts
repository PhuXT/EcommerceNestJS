import { BadRequestException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from '../database/entity.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/users.schema';

export class UserRepository extends EntityRepository<UserDocument> {
  constructor(@InjectModel(User.name) userModel: Model<UserDocument>) {
    super(userModel);
  }

  async create(createUserDto: CreateUserDto): Promise<UserDocument> | null {
    try {
      const user = await super.create(createUserDto);
      return user;
    } catch (error) {
      throw new ConflictException('Email already exist');
    }
    return null;
  }
}
