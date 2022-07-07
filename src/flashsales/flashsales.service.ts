import { Injectable } from '@nestjs/common';
import { UpdateFlashsaleDto } from './dto/update-flashsale.dto';
import { IFlashSale } from './entities/flashsale.entity';
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

  findOne(id: number) {
    return `This action returns a #${id} flashsale`;
  }

  update(id: string, updateFlashsaleDto: UpdateFlashsaleDto) {
    return this.flashsaleRepository.findOneAndUpdate(
      { _id: id },
      updateFlashsaleDto,
    );

    // remove(id: string) {
    //   return `This action removes a #${id} flashsale`;
    // }
  }
}
