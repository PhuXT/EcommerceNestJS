import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  FileInterceptor,
  FileFieldsInterceptor,
} from '@nestjs/platform-express';
import { imageFileFilter } from 'src/users/multer/multer.config';
import { NewFileDetailDto } from './dto/new-file-detail.dto';
import { UploadsService } from './uploads.service';

@Controller('uploads')
export class UploadsController {
  constructor(readonly uploadService: UploadsService) {}

  @Post('/')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'image', maxCount: 1 },
        { name: 'imageDetails', maxCount: 3 },
      ],
      { fileFilter: imageFileFilter },
    ),
  )
  async upload(
    @UploadedFiles() files: Express.Multer.File,
    @Body() fileDetail: NewFileDetailDto,
  ) {
    console.log(files);

    // return await this.uploadService.upload(file, fileDetail.bucketPath);
  }
}
