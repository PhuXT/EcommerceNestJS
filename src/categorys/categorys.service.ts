import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ItemsService } from 'src/items/items.service';
import { STATUS_ENUM } from './categorys.constant';
import { CategoryRepository } from './categotys.repository';
import { ICategory, ICategoryUpdate } from './entity/category.entity';

@Injectable()
export class CategorysService {
  constructor(
    private categoryRepository: CategoryRepository,
    private itemService: ItemsService,
  ) {}

  // CREATE
  async create(createCategoryDto: ICategory): Promise<ICategory> {
    return this.categoryRepository.create(createCategoryDto);
  }

  // DELETE
  async delete(categoryId: string): Promise<boolean> {
    const itemWiThThisCategory = await this.itemService.find({
      'category.id': categoryId,
    });
    console.log(itemWiThThisCategory[0]);

    if (itemWiThThisCategory[0]) {
      throw new BadRequestException('You cannot delete this item');
    }
    return this.categoryRepository.deleteMany({ _id: categoryId });
  }

  // GET ALL
  getCategories(): Promise<ICategory[]> {
    return this.categoryRepository.find({});
  }

  // GET ACTIVE ASC
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

  // GET BY ID
  getCategory(categoryName: string): Promise<ICategory> {
    return this.categoryRepository.findOne({ categoryName });
  }

  // UPDATE
  async update(
    categoryId: string,
    updateCategoryDto: ICategoryUpdate,
  ): Promise<ICategory> {
    let updateted = this.categoryRepository.findOneAndUpdateOverriding(
      categoryId,
      updateCategoryDto,
    );

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

    // Update categoryName of collection item and collection Category
    if (updateCategoryDto.categoryName) {
      const category = await this.categoryRepository.findOne({
        _id: categoryId,
      });

      const oldCategoryName = category.categoryName;
      const arrUpdate = [];
      const categoryUpdate = this.categoryRepository.findOneAndUpdateOverriding(
        categoryId,
        updateCategoryDto,
      );
      arrUpdate.push(categoryUpdate);

      const updateCategoryOfItem = this.itemService.updateMany(
        { 'category.name': oldCategoryName },
        { $set: { 'category.name': updateCategoryDto.categoryName } },
      );
      arrUpdate.push(updateCategoryOfItem);

      Promise.all(arrUpdate).then((value) => {
        updateted = value[0];
      });
    }

    return updateted;
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
