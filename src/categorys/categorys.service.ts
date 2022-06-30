import { BadGatewayException, Injectable } from '@nestjs/common';
import { STATUS_ENUM } from './categorys.constant';
import { CategoryRepository } from './categotys.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ICategory } from './entity/category.entity';

@Injectable()
export class CategorysService {
  constructor(private categoryRepository: CategoryRepository) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<ICategory> {
    return this.categoryRepository.create(createCategoryDto);
  }

  delete(categoryId: string): Promise<boolean> {
    return this.categoryRepository.deleteMany({ _id: categoryId });
  }

  getCategories(): Promise<ICategory[]> {
    return this.categoryRepository.find({});
  }

  updateStatus(categoryId, status): Promise<ICategory> {
    return this.categoryRepository.findOneAndUpdate(categoryId, status);
  }

  async updatePriority(updateCategoryId, toCategoryBody) {
    const updateCategory = await this.categoryRepository.findOne({
      _id: updateCategoryId,
    });
    const toCategory = await this.categoryRepository.findOne({
      _id: toCategoryBody.categoryId,
    });
    if (!updateCategory || toCategoryBody) {
      throw new BadGatewayException('Category not exist');
    }

    if (
      updateCategory.status !== STATUS_ENUM.ACTIVE ||
      toCategory.status !== STATUS_ENUM.ACTIVE
    ) {
      throw new BadGatewayException('You need active cetegory');
    }
    const toCategoryPriority = toCategory.priority;
    const updateCategoryPriority = updateCategory.priority;

    this.categoryRepository.findOneAndUpdate(
      { _id: toCategoryBody.categoryId },
      { priority: '' },
    );

    this.categoryRepository.findOneAndUpdate(
      { _id: updateCategoryId },
      { priority: toCategoryPriority },
    );

    this.categoryRepository.findOneAndUpdate(
      { _id: toCategoryBody.categoryId },
      { priority: updateCategoryPriority },
    );
    return true;
  }
}
