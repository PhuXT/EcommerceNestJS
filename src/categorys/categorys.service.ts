import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './categotys.repository';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategorysService {
  constructor(private categoryRepository: CategoryRepository) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return this.categoryRepository.create(createCategoryDto);
  }
}
