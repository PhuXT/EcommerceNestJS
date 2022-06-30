import { BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from '../database/entity.repository';
import { Category, CategotyDocument } from './categotys.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ICategory } from './entity/category.entity';

export class CategoryRepository extends EntityRepository<CategotyDocument> {
  constructor(
    @InjectModel(Category.name) categotyrModel: Model<CategotyDocument>,
  ) {
    super(categotyrModel);
  }
  async create(
    createCategoryDto: CreateCategoryDto,
  ): Promise<CategotyDocument> | null {
    try {
      const category = await super.create(createCategoryDto);
      return category;
    } catch (error) {
      if (error.keyPattern.categoryName)
        throw new BadRequestException('Category name is exist');
      if (error.keyPattern.priority)
        throw new BadRequestException('Priority name is exist');
    }
    return null;
  }
}
