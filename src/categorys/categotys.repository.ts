import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from '../database/entity.repository';
import { Category, CategotyDocument } from './categotys.schema';

export class CategoryRepository extends EntityRepository<CategotyDocument> {
  constructor(
    @InjectModel(Category.name) categotyrModel: Model<CategotyDocument>,
  ) {
    super(categotyrModel);
  }
}
