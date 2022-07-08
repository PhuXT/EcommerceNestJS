import { Injectable } from '@nestjs/common';
import { SORT_ENUM } from 'src/database/database.contant';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ICreateItem, IItem, IUpdateItem } from './entities/item.entity';
import { ItemsRepository } from './items.repository';

@Injectable()
export class ItemsService {
  constructor(private itemRepository: ItemsRepository) {}

  create(createItemDto: ICreateItem): Promise<IItem> {
    return this.itemRepository.create(createItemDto);
  }

  findAll(
    page?: number,
    limit?: number,
    sortBy?: string,
    options?: SORT_ENUM,
  ): Promise<IItem[]> {
    const skip = limit * (page - 1);
    return this.itemRepository.find2({}, skip, limit, sortBy, options);
  }

  findOne(id: number) {
    return `This action returns a #${id} item`;
  }

  update(id: string, updateItemDto: IUpdateItem) {
    return this.itemRepository.findOneAndUpdate({ _id: id }, updateItemDto);
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }
}
