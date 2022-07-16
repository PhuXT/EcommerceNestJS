import { BadRequestException, Injectable } from '@nestjs/common';
import { time } from 'console';
import { SORT_ENUM } from 'src/database/database.contant';
import { FlashsalesService } from 'src/flashsales/flashsales.service';
import { ICreateItem, IItem, IUpdateItem } from './entities/item.entity';
import { ItemsRepository } from './items.repository';

@Injectable()
export class ItemsService {
  constructor(
    private itemRepository: ItemsRepository,
    private flashsalesService: FlashsalesService,
  ) {}

  async create(createItemDto: ICreateItem): Promise<IItem> {
    createItemDto['stocks'] = createItemDto.quantity;
    return this.itemRepository.create(createItemDto);
  }

  async findAll(
    page?: number,
    limit?: number,
    sortBy?: string,
    options?: SORT_ENUM,
  ): Promise<IItem[]> | null {
    const skip = limit * (page - 1);
    const listItem = Promise.all([
      this.flashsalesService.findFlashSaleNow(),
      this.itemRepository.findWithOptions({}, skip, limit, sortBy, options),
    ]).then((value) => {
      const [flashSaleNow, listItem] = value;
      return listItem.map((item) => this.getItemFlashSale(item, flashSaleNow));
    });

    return listItem;
  }

  async findOne(id: string): Promise<IItem> {
    const item = Promise.all([
      this.itemRepository.findOne({ _id: id }),
      this.flashsalesService.findFlashSaleNow(),
    ]).then((value) => {
      const [item, flashSaleNow] = value;
      return this.getItemFlashSale(item, flashSaleNow);
    });
    return item;
  }

  async findOneOrigin(id: string): Promise<IItem> {
    return this.itemRepository.findOne({ _id: id });
  }

  update(id: string, updateItemDto: IUpdateItem) {
    return this.itemRepository.findOneAndUpdate({ _id: id }, updateItemDto);
  }

  async remove(id: string): Promise<boolean> {
    const item = await this.itemRepository.findOne({ _id: id });
    if (item.sold > 0) throw new BadRequestException('Item cannot be delete');
    return this.itemRepository.deleteMany({ _id: id });
  }

  getItemFlashSale(item: IItem, flashSaleNow): IItem {
    if (flashSaleNow && item) {
      const itemWithFlashSale = { ...item['_doc'] };
      flashSaleNow.items.forEach((itemFlashSale) => {
        if (itemFlashSale.itemId.toString() === item['_id'].toString()) {
          itemWithFlashSale['flashSalePrice'] =
            item.price - (item.price * itemFlashSale.discount) / 100;
          itemWithFlashSale['flashSaleName'] = flashSaleNow.name;
          itemWithFlashSale['flashSaleId'] = flashSaleNow._id;
          itemWithFlashSale['flashSaleDiscount'] = itemFlashSale.discount;
          itemWithFlashSale['flashSaleQuantity'] =
            itemFlashSale.flashSaleQuantity;
        }
      });
      return itemWithFlashSale;
    }
    return item;
  }

  updateStocks(itemId: string, stocksUpdate: number) {
    return this.itemRepository.update(
      {
        _id: itemId,
      },
      {
        $inc: {
          stocks: stocksUpdate,
        },
      },
    );
  }
}
