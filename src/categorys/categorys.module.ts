import { Module } from '@nestjs/common';
import { CategorysService } from './categorys.service';
import { CategorysController } from './categorys.controller';
import { CategoryRepository } from './categotys.repository';
import { Category, CategorySchema } from './categotys.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UploadsModule } from 'src/uploads/uploads.module';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
    // MongooseModule.forFeatureAsync([
    //   {
    //     name: Category.name,
    //     useFactory: () => {
    //       const schema = CategorySchema;
    //       schema.plugin(require('mongoose-delete'));
    //       return schema;
    //     },
    //   },
    // ]),
  ],
  providers: [CategorysService, CategoryRepository],
  controllers: [CategorysController],
  exports: [CategorysService, CategoryRepository],
})
export class CategorysModule {}
