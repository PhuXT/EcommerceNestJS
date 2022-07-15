import { BadRequestException, Injectable } from '@nestjs/common';
import { FlashsalesService } from 'src/flashsales/flashsales.service';
import { ItemsService } from 'src/items/items.service';
import { UsersService } from 'src/users/users.service';
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
      // Co the xoa
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
        if (voucher.quantity <= 0) {
          throw new BadRequestException(
            'Voucher are no longer available. Please use another voucher',
          );
        }
        createItemOrder.voucherDiscount = voucher.discount;

        createItemOrder.codeVoucher = voucher.code;
        createItemOrder.voucherQuantity = voucher.quantity;
        createItemOrder.voucehrId = voucher._id;

        createItemOrder.totalPrice =
          createItemOrder.totalPrice -
          (createItemOrder.totalPrice * voucher.discount) / 100;
      }

      return createItemOrder;
    });
    const items = await Promise.all(listItem).then((value) => value);

    const listUpdate = items.reduce(
      (initialValue, item) => {
        const originPrice = initialValue[0] + item.originPrice;
        const totalPrice = initialValue[1] + item.totalPrice;
        return [originPrice, totalPrice];
      },
      [0, 0],
    );
    const [originPrice, totalPrice] = listUpdate;

    const order = await this.ordersRepositoty.create({
      user,
      items,
      originPrice,
      totalPrice,
    });

    // Update stocks
    if (order) {
      let voucher = 0;
      let voucherId;
      items.forEach(async (item) => {
        await this.itemService.update(item._id.toString(), {
          stocks: item.stocksUpdate,
        });

        if (item.flashSaleQuantityUpdate !== null) {
          await this.flashSaleService.updateQuantity(
            item.flashSaleId.toString(),
            item._id.toString(),
            -item.amountOrder,
          );
        }

        if (item.voucehrId) {
          console.log('Vao day');

          voucher++;
          voucherId = item.voucehrId;
          console.log(voucher);
        }
      });
      console.log('>>>>>>>>>>>>');

      console.log(voucher);

      if (voucher > 0) {
        console.log('Co voucher');

        await this.voucherService.updateQuantity(voucherId, -1);
      }
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
