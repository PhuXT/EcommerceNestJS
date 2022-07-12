import { Injectable } from '@nestjs/common';
import { SORT_ENUM } from 'src/database/database.contant';
import { ICreateItem, IItem, IUpdateItem } from './entities/item.entity';
import { ItemsRepository } from './items.repository';

@Injectable()
export class ItemsService {
  constructor(private itemRepository: ItemsRepository) {}

  async create(createItemDto: ICreateItem): Promise<IItem> {
    const itemDto = await this.itemRepository.create(createItemDto);
    const newItem = await this.itemRepository.findOneAndUpdate(
      { _id: itemDto._id },
      { stocks: itemDto.quantity },
    );
    return newItem;
  }

  findAll(
    page?: number,
    limit?: number,
    sortBy?: string,
    options?: SORT_ENUM,
  ): Promise<IItem[]> {
    const skip = limit * (page - 1);
    return this.itemRepository.findWithOptions(
      {},
      skip,
      limit,
      sortBy,
      options,
    );
  }

  findOne(id: string): Promise<IItem> {
    return this.itemRepository.findOne({ _id: id });
  }

  update(id: string, updateItemDto: IUpdateItem) {
    return this.itemRepository.findOneAndUpdate({ _id: id }, updateItemDto);
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }
}
