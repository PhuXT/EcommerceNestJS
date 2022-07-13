import { BadRequestException, Injectable } from '@nestjs/common';
import { FilterQuery } from 'mongoose';
import { CategorysService } from 'src/categorys/categorys.service';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import { IVoucher } from './entities/voucher.entity';
import { VoucherDocument } from './voucher.schema';
import { VoucherRepository } from './vouchers.repository';

@Injectable()
export class VouchersService {
  constructor(
    private voucherRepository: VoucherRepository,
    private categoryService: CategorysService,
  ) {}

  async create(createVoucherDto: IVoucher): Promise<IVoucher> {
    for (let i = 0; i < createVoucherDto.categories.length; i++) {
      const category = await this.categoryService.getCategory(
        createVoucherDto.categories[i],
      );

      if (!category) {
        throw new BadRequestException(
          `${createVoucherDto.categories[i]} is not exist`,
        );
      }
    }

    return this.voucherRepository.create(createVoucherDto);
  }

  findAll(): Promise<IVoucher[]> {
    return this.voucherRepository.find({});
  }

  // find(filterQuery: FilterQuery<VoucherDocument>): Promise<IVoucher> {
  //   return this.voucherRepository.findOne(filterQuery);
  // }

  findOne(id: string): Promise<IVoucher> {
    return this.voucherRepository.findOne({ _id: id });
  }
  findVoucherNow(voucherCode): Promise<IVoucher> {
    const dateNow = new Date().toISOString();
    return this.voucherRepository.findOne({
      startTime: { $lt: dateNow },
      endTime: { $gt: dateNow },
      code: voucherCode,
    });
  }
  update(id: string, updateVoucherDto: UpdateVoucherDto) {
    return this.voucherRepository.findOneAndUpdate(
      {
        _id: id,
      },
      updateVoucherDto,
    );
  }

  remove(id: string): Promise<boolean> {
    return this.voucherRepository.deleteMany({ _id: id });
  }
}
