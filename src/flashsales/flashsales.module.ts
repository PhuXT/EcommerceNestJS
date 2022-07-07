import { Module } from '@nestjs/common';
import { FlashsalesService } from './flashsales.service';
import { FlashsalesController } from './flashsales.controller';
import { FlashSale, FlashSaleSchema } from './flashsale.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { FlashSaleRepository } from './flashsales.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FlashSale.name, schema: FlashSaleSchema },
    ]),
  ],
  controllers: [FlashsalesController],
  providers: [FlashsalesService, FlashSaleRepository],
})
export class FlashsalesModule {}
