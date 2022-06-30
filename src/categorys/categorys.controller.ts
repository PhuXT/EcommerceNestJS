import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { CategorysService } from './categorys.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Express } from 'express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/users/multer/multer.config';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/role.decorator';
import { ROLE_ENUM } from 'src/users/users.constant';
import { ICategory } from './entity/category.entity';
import { type } from 'os';

@ApiTags('categories')
@ApiBearerAuth()
@Controller('categories')
export class CategorysController {
  constructor(private categoryService: CategorysService) {}

  // [POST] api/v1/categories
  @ApiCreatedResponse({ type: ICategory, description: 'Return new category' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_ENUM.ADMIN)
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
  ): Promise<ICategory> {
    const linkImage = `http://${process.env.HOST}/api/v1/categories/${file.filename}`;
    createCategoryDto.image = linkImage;
    return this.categoryService.create(createCategoryDto);
  }

  // [GET] api/v1/categories/:imgName
  @ApiCreatedResponse({ description: 'Return image' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_ENUM.ADMIN)
  @Get(':imgName')
  seeUploadedFile(@Param('imgName') imgName, @Res() res) {
    return res.sendFile(imgName, { root: './uploaded/categories-img' });
  }

  // [DELETE] api/v1/categories/:categoryId
  @ApiBody({ type: String })
  @ApiOkResponse({ type: Boolean, description: 'Return boolean' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_ENUM.ADMIN)
  @Delete(':categoryId')
  deleteCategory(@Param('categoryId') categoryId: string): Promise<boolean> {
    return this.categoryService.delete(categoryId);
  }

  // [GET] api/v1/categories'
  @ApiOkResponse({
    type: [ICategory],
    description: 'Return list category',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_ENUM.ADMIN)
  @Get()
  getCategories(): Promise<ICategory[]> {
    return this.categoryService.getCategories();
  }

  // [PATCH] api/v1/categories/status'
  @ApiOkResponse({ type: ICategory, description: 'return updated category' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_ENUM.ADMIN)
  @Patch('/status/:categoryId')
  updateStatus(
    @Param('categoryId') categoryId,
    @Body() status,
  ): Promise<ICategory> {
    return this.categoryService.updateStatus(categoryId, status);
  }

  // [PATCH] api/v1/categories/priority:categoryId'
  @ApiOkResponse({ type: Boolean, description: 'return status update' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_ENUM.ADMIN)
  @Patch('/priority/:categoryId')
  updatePriority(@Param('categoryId') updateCategoryId, @Body() toCategory) {
    return this.categoryService.updatePriority(updateCategoryId, toCategory);
  }
}
