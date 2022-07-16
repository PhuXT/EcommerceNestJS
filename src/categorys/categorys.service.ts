import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { STATUS_ENUM } from './categorys.constant';
import { CategoryRepository } from './categotys.repository';
import { ICategory, ICategoryUpdate } from './entity/category.entity';

@Injectable()
export class CategorysService {
  constructor(private categoryRepository: CategoryRepository) {}

  async create(createCategoryDto: ICategory): Promise<ICategory> {
    return this.categoryRepository.create(createCategoryDto);
  }

  delete(categoryId: string): Promise<boolean> {
    return this.categoryRepository.deleteMany({ _id: categoryId });
  }

  getCategories(): Promise<ICategory[]> {
    return this.categoryRepository.find({});
  }

  async getCategoriesActive(): Promise<ICategory[]> {
    try {
      const CategoriesActive = await this.categoryRepository.find({
        status: STATUS_ENUM.ACTIVE,
      });

      CategoriesActive.sort((a, b) => {
        if (a.priority < b.priority) return -1;
        return 0;
      });

      return CategoriesActive;
    } catch (error) {
      if (error) throw new InternalServerErrorException('Server error');
    }
  }

  getCategory(categoryName: string): Promise<ICategory> {
    return this.categoryRepository.findOne({ categoryName });
  }

  // UPDATE
  async update(
    categoryId: string,
    updateCategoryDto: ICategoryUpdate,
  ): Promise<ICategory> {
    if (updateCategoryDto.priority) {
      const listCategoryActive = await this.categoryRepository.find({
        status: STATUS_ENUM.ACTIVE,
      });

      if (listCategoryActive.length <= 1) {
        throw new BadRequestException(
          'This category priority already number one',
        );
      }

      updateCategoryDto.priority = this.updatePriority(
        Number(updateCategoryDto.priority) - 1,
        listCategoryActive,
      );
    }

    if (updateCategoryDto.categoryName) {
      const categoryUpdate = this.categoryRepository.findOneAndUpdateOverriding(
        categoryId,
        updateCategoryDto,
      );
    }
    return this.categoryRepository.findOneAndUpdateOverriding(
      categoryId,
      updateCategoryDto,
    );
  }

  //Funtion update priority
  updatePriority(priority: number, listCategoryActive): number {
    listCategoryActive.sort((a, b) => {
      if (a.priority < b.priority) return -1;
      return 0;
    });

    if (priority <= 0) {
      return Number(listCategoryActive[0].priority) - 1;
    }

    if (priority >= listCategoryActive.length - 1) {
      return (
        Number(listCategoryActive[listCategoryActive.length - 1].priority) + 1
      );
    }

    const prePriorityCategory = Number(
      listCategoryActive[priority - 1].priority,
    );
    const nextPriorityCategory = Number(
      listCategoryActive[priority + 1].priority,
    );

    return (prePriorityCategory + nextPriorityCategory) / 2;
  }
}
