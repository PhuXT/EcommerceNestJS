import { BadRequestException, Injectable } from '@nestjs/common';
import { FlashsalesService } from 'src/flashsales/flashsales.service';
import { ItemsService } from 'src/items/items.service';
import { UsersService } from 'src/users/users.service';
import { IVoucher } from 'src/vouchers/entities/voucher.entity';
import { VouchersService } from 'src/vouchers/vouchers.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersRepository } from './order.repository';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepositoty: OrdersRepository,
    private readonly userService: UsersService,
    private readonly flashSaleService: FlashsalesService,
    private readonly voucherService: VouchersService,
    private readonly itemService: ItemsService,
  ) {}

  async create(userInfor, createOrderDto: CreateOrderDto) {
    const user = createOrderDto.user;
    user['userId'] = userInfor.id;
    user['userName'] = userInfor.userName;

    let voucher: IVoucher;

    if (createOrderDto.voucherCode) {
      voucher = await this.voucherService.findVoucherNow(
        createOrderDto.voucherCode,
      );
    }

    const listItem = createOrderDto.items.map(async (itemOrderDto) => {
      const item = await this.itemService.findOne(
        itemOrderDto.itemId.toString(),
      );
      if (!item) {
        throw new BadRequestException('item doesnt exist');
      }
      const {
        cost,
        avatarImg,
        detailImgs,
        descriptions,
        quantity,
        stocks,
        sold,
        tags,
        createdAt,
        updatedAt,
        weight,
        flashSalePrice,
        category,
        __v,
        ...createItem
      } = item;

      createItem['totalPrice'] = item.price * itemOrderDto.amount;
      if (item.flashSalePrice) {
        createItem['totalPrice'] = item.flashSalePrice * itemOrderDto.amount;
      }
      createItem['amountOrder'] = itemOrderDto.amount;
      createItem['originPrice'] = item.price * itemOrderDto.amount;

      if (voucher && voucher.categories.includes(item.category.name)) {
        createItem['voucherDiscount'] = voucher.discount;
        createItem['codeVoucher'] = voucher.code;
        createItem['totalPrice'] =
          (item.flashSalePrice -
            (item.flashSalePrice * voucher.discount) / 100) *
          itemOrderDto.amount;
      }

      return createItem;
    });
    const items = await Promise.all(listItem).then((value) => value);
    console.log(items);

    const originPrice = items.reduce(
      (preValue, currenValue) => preValue + currenValue['originPrice'],
      0,
    );
    const totalPrice = items.reduce(
      (preValue, currenValue) => preValue + currenValue['totalPrice'],
      0,
    );

    return this.ordersRepositoty.create({
      user,
      items,
      originPrice,
      totalPrice,
    });
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
