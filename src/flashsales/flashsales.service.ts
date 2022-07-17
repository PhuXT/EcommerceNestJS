import { ConflictException, Injectable } from '@nestjs/common';
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

  async findAll(): Promise<IFlashSale[]> {
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

  findOne(id: string): Promise<IFlashSale> {
    return this.flashsaleRepository.findOne({ _id: id });
  }

  async update(id: string, updateFlashsaleDto: IFlashSale) {
    const startTimeUpdate = new Date(
      updateFlashsaleDto.startTime,
    ).toISOString();
    const endTimeUpdate = new Date(updateFlashsaleDto.endTime).toISOString();
    const flashSaleConflic = await this.flashsaleRepository.findOne({
      startTime: { $gt: startTimeUpdate },
      endTime: { $lt: endTimeUpdate },
      status: STATUS_FLASHSALE_ENUM.ACTIVE,
    });
    if (flashSaleConflic)
      throw new ConflictException('There existed flash sales during this time');
    return this.flashsaleRepository.findOneAndUpdate(
      { _id: id },
      updateFlashsaleDto,
    );
  }

  updateQuantity(idFlashSale: string, itemId: string, quantityUpdate: number) {
    return this.flashsaleRepository.update(
      {
        _id: idFlashSale,
        'items.itemId': itemId,
      },
      {
        $inc: {
          'items.$.flashSaleQuantity': quantityUpdate,
        },
      },
    );
  }

  remove(id: string): Promise<boolean> {
    return this.flashsaleRepository.deleteMany({ _id: id });
  }
}
