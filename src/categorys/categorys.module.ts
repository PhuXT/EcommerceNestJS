import { Module } from '@nestjs/common';
import { CategorysService } from './categorys.service';
import { CategorysController } from './categorys.controller';
import { CategoryRepository } from './categotys.repository';
import { Category, CategorySchema } from './categotys.schema';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  providers: [CategorysService, CategoryRepository],
  controllers: [CategorysController],
  exports: [CategorysService, CategoryRepository],
})
export class CategorysModule {}
