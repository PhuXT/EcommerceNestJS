import { Module, forwardRef } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { Item, ItemSchema } from './item.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsRepository } from './items.repository';
import { FlashsalesModule } from 'src/flashsales/flashsales.module';

@Module({
  imports: [
    FlashsalesModule,
    // forwardRef(() => FlashsalesModule),
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
  ],
  controllers: [ItemsController],
  providers: [ItemsService, ItemsRepository],
  exports: [ItemsService, ItemsRepository],
})
export class ItemsModule {}
