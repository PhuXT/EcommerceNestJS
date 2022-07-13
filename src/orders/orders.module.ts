import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order, OrderSchema } from './order.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersRepository } from './order.repository';
import { UsersModule } from 'src/users/users.module';
import { FlashsalesModule } from 'src/flashsales/flashsales.module';
import { VouchersModule } from 'src/vouchers/vouchers.module';
import { ItemsModule } from 'src/items/items.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    UsersModule,
    FlashsalesModule,
    VouchersModule,
    ItemsModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
})
export class OrdersModule {}
