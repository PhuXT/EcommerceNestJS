import { Injectable } from '@nestjs/common';
import { CategorysService } from 'src/categorys/categorys.service';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import { IVoucher } from './entities/voucher.entity';
import { VoucherRepository } from './vouchers.repository';

@Injectable()
export class VouchersService {
  constructor(
    private voucherRepository: VoucherRepository,
    private categoryService: CategorysService,
  ) {}

  async create(createVoucherDto: IVoucher): Promise<IVoucher> {
    // createVoucherDto.categories.forEach(async (categoryName) => {
    //   const category = await this.categoryService.getCategory(categoryName);
    //   console.log(category);

    //   if (!category) {
    //     throw new BadRequestException(`${categoryName} is not exist`);
    //   }CreateVoucherDto
    // });

    return this.voucherRepository.create(createVoucherDto);
  }

  findAll(): Promise<IVoucher[]> {
    return this.voucherRepository.find({});
  }

  findOne(id: string): Promise<IVoucher> {
    return this.voucherRepository.findOne({ _id: id });
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
