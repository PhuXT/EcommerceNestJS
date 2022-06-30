import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { CategorysService } from './categorys.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Express } from 'express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/users/multer/multer.config';

@Controller('categories')
export class CategorysController {
  constructor(private categoryService: CategorysService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploaded/categories-img',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  create(
    @Body() createCategoryDto: CreateCategoryDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(createCategoryDto);

    const linkImage = `http://${process.env.HOST}/api/v1/categories/${file.filename}`;
    createCategoryDto.image = linkImage;
    return this.categoryService.create(createCategoryDto);
  }
  @Get(':imgName')
  seeUploadedFile(@Param('imgName') imgName, @Res() res) {
    return res.sendFile(imgName, { root: './uploaded/categories-img' });
  }
}
