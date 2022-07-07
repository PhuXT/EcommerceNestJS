import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageFileFilter } from 'src/users/multer/multer.config';
import { NewFileDetailDto } from './dto/new-file-detail.dto';
import { UploadsService } from './uploads.service';

@Controller('uploads')
export class UploadsController {
  constructor(readonly uploadService: UploadsService) {}

  @Post('/')
  @UseInterceptors(FileInterceptor('file', { fileFilter: imageFileFilter }))
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Body() fileDetail: NewFileDetailDto,
  ) {
    return await this.uploadService.upload(file, fileDetail.bucketPath);
  }
}
