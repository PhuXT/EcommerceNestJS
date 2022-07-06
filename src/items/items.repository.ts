import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from '../database/entity.repository';
import { Item, ItemDocument } from './item.schema';

export class ItemsRepository extends EntityRepository<ItemDocument> {
  constructor(@InjectModel(Item.name) itemModel: Model<ItemDocument>) {
    super(itemModel);
  }
}
