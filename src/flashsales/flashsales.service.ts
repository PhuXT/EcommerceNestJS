import { Injectable } from '@nestjs/common';
import { FilterQuery } from 'mongoose';
import { UpdateFlashsaleDto } from './dto/update-flashsale.dto';
import { IFlashSale } from './entities/flashsale.entity';
import { STATUS_FLASHSALE_ENUM } from './flashsale.constain';
import { FlashSaleDocument } from './flashsale.schema';
import { FlashSaleRepository } from './flashsales.repository';

@Injectable()
export class FlashsalesService {
  constructor(private flashsaleRepository: FlashSaleRepository) {}

  create(createFlashsaleDto: IFlashSale): Promise<IFlashSale> {
    return this.flashsaleRepository.create(createFlashsaleDto);
  }

  findAll(): Promise<IFlashSale[]> {
    return this.flashsaleRepository.find({});
  }

  find(filterQuery: FilterQuery<FlashSaleDocument>): Promise<IFlashSale[]> {
    return this.flashsaleRepository.find(filterQuery);
  }

  findFlashSaleNow(): Promise<IFlashSale> {
    const dateNow = new Date().toISOString();
    return this.flashsaleRepository.findOne({
      startTime: { $lt: dateNow },
      endTime: { $gt: dateNow },
      status: STATUS_FLASHSALE_ENUM.ACTIVE,
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} flashsale`;
  }

  update(id: string, updateFlashsaleDto: UpdateFlashsaleDto) {
    return this.flashsaleRepository.findOneAndUpdate(
      { _id: id },
      updateFlashsaleDto,
    );
  }

  update2(id, updateFlashsaleDto) {
    return this.flashsaleRepository.update(id, updateFlashsaleDto);
  }

  updateQuantity(idFlashSale, itemId, quantityUpdate) {
    return this.flashsaleRepository.update(
      {
        _id: idFlashSale,
        'items.itemId': itemId,
      },
      {
        $inc: {
          // 'items.$.flashSaleQuantity': item.flashSaleQuantityUpdate,
          'items.$.flashSaleQuantity': quantityUpdate,
        },
      },
    );
  }
}
