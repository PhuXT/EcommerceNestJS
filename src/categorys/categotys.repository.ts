import { ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from '../database/entity.repository';
import { Category, CategotyDocument } from './categotys.schema';
import { ICategory, ICategoryUpdate } from './entity/category.entity';

export class CategoryRepository extends EntityRepository<CategotyDocument> {
  constructor(
    @InjectModel(Category.name) categotyrModel: Model<CategotyDocument>,
  ) {
    super(categotyrModel);
  }

  async create(createCategoryDto: ICategory): Promise<CategotyDocument> {
    try {
      const category = await super.create(createCategoryDto);
      return category;
    } catch (error) {
      if (error.keyPattern.categoryName)
        throw new ConflictException('Category already exist');
      if (error.keyPattern.priority)
        throw new ConflictException('Priority already exist');
    }
  }

  async findOneAndUpdateOverriding(
    categoryId,
    updateCategoryDto,
  ): Promise<ICategory> {
    try {
      const category = await super.findOneAndUpdate(
        { _id: categoryId },
        updateCategoryDto,
      );
      return category;
    } catch (error) {
      if (error['keyPattern']) {
        if (error['keyPattern']['categoryName']) {
          throw new ConflictException('Category already exist');
        }

        if (error['keyPattern']['priority'])
          throw new ConflictException('Priority already exist');
      }
    }
  }
}
