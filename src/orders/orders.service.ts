import { BadRequestException, Injectable } from '@nestjs/common';
import { log } from 'console';
import { FlashsalesService } from 'src/flashsales/flashsales.service';
import { ItemsService } from 'src/items/items.service';
import { UsersService } from 'src/users/users.service';
import { IVoucher } from 'src/vouchers/entities/voucher.entity';
import { VouchersService } from 'src/vouchers/vouchers.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CreateItemOrder, UserOrder } from './entities/order.entity';
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
    // user Order
    const user: UserOrder = createOrderDto.user;
    user.userId = userInfor.id;
    user.userName = userInfor.userName;

    // Check List Item Order
    const listItem = createOrderDto.items.map(async (itemOrderDto) => {
      let itemDtail = await this.itemService.findOne(
        itemOrderDto.itemId.toString(),
      );

      // Check Stocks Item
      if (itemDtail.stocks < itemOrderDto.amount) {
        throw new BadRequestException(
          `${itemDtail.name} does not have enough inventory`,
        );
      }

      let createItemOrder: CreateItemOrder = itemDtail;

      let flashSaleQuantityUpdate =
        itemDtail.flashSaleQuantity - itemOrderDto.amount;

      if (itemDtail.flashSaleQuantity < itemOrderDto.amount) {
        itemDtail = await this.itemService.findOneOrigin(
          itemOrderDto.itemId.toString(),
        );
        createItemOrder = { ...itemDtail['_doc'] };

        flashSaleQuantityUpdate = null;
      }

      createItemOrder.flashSaleQuantityUpdate = flashSaleQuantityUpdate;
      createItemOrder.stocksUpdate = itemDtail.stocks - itemOrderDto.amount;

      createItemOrder.amountOrder = itemOrderDto.amount;
      createItemOrder.totalPrice = itemDtail.price * itemOrderDto.amount;

      if (itemDtail.flashSalePrice) {
        createItemOrder.flashSaleId = itemDtail.flashSaleId;
        createItemOrder.totalPrice =
          itemDtail.flashSalePrice * itemOrderDto.amount;
      }
      createItemOrder.originPrice = itemDtail.price * itemOrderDto.amount;

      // Find voucher
      if (createOrderDto.voucherCode) {
        const voucher = await this.voucherService.findVoucherNow(
          createOrderDto.voucherCode,
        );
        if (!voucher) {
          throw new BadRequestException('Voucher does not exist');
        }
        if (!voucher.categories.includes(itemDtail.category.name)) {
          throw new BadRequestException(
            `Voucher is not applicable for ${itemOrderDto.itemId} `,
          );
        }
        createItemOrder.voucherDiscount = voucher.discount;

        createItemOrder.codeVoucher = voucher.code;

        createItemOrder.totalPrice =
          createItemOrder.totalPrice -
          (createItemOrder.totalPrice * voucher.discount) / 100;
      }

      return createItemOrder;
    });
    const items = await Promise.all(listItem).then((value) => value);

    const originPrice = items.reduce(
      (initialValue, item) => initialValue + item.originPrice,
      0,
    );
    const totalPrice = items.reduce((initialValue, item) => {
      return initialValue + item.totalPrice;
    }, 0);

    const order = await this.ordersRepositoty.create({
      user,
      items,
      originPrice,
      totalPrice,
    });

    console.log(order);

    // Update stocks
    if (order) {
      items.forEach(
        (item) =>
          this.itemService.update(item._id.toString(), {
            stocks: item['stocksUpdate'],
          }),
        // this.flashSaleService.update(items.)
      );
    }
    return order;
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
