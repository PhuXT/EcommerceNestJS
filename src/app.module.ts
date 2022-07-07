import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { EmailsModule } from './emails/emails.module';

import { CategorysModule } from './categorys/categorys.module';
import { MulterModule } from '@nestjs/platform-express/multer';
import { VouchersModule } from './vouchers/vouchers.module';
import { ItemsModule } from './items/items.module';
import { UploadsModule } from './uploads/uploads.module';
import { FlashsalesModule } from './flashsales/flashsales.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    MulterModule.register({
      dest: './uploadedFiles',
    }),
    UsersModule,
    AuthModule,
    EmailsModule,
    CategorysModule,
    VouchersModule,
    ItemsModule,
    UploadsModule,
    FlashsalesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
