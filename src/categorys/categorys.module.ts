import { Module } from '@nestjs/common';
import { CategorysService } from './categorys.service';
import { CategorysController } from './categorys.controller';
import { CategoryRepository } from './categotys.repository';
import { Category, CategorySchema } from './categotys.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UploadsModule } from 'src/uploads/uploads.module';
import { ItemsModule } from 'src/items/items.module';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
    ItemsModule,
  ],
  providers: [CategorysService, CategoryRepository],
  controllers: [CategorysController],
  exports: [CategorysService, CategoryRepository],
})
export class CategorysModule {}
