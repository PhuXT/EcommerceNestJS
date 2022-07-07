import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CategorysService } from './categorys.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/role.decorator';
import { ROLE_ENUM } from 'src/users/users.constant';
import { ICategory } from './entity/category.entity';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('categories')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(ROLE_ENUM.ADMIN)
@Controller('categories')
export class CategorysController {
  constructor(private categoryService: CategorysService) {}

  // [POST] api/v1/categories
  @ApiCreatedResponse({ type: ICategory, description: 'Return new category' })
  @Post('/')
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<ICategory> {
    return this.categoryService.create(createCategoryDto);
  }

  // [DELETE] api/v1/categories/:categoryId
  @ApiBody({ type: String })
  @ApiOkResponse({ type: Boolean, description: 'Return boolean' })
  @Delete(':categoryId')
  deleteCategory(@Param('categoryId') categoryId: string): Promise<boolean> {
    return this.categoryService.delete(categoryId);
  }

  // [GET] api/v1/categories'
  @ApiOkResponse({
    type: [ICategory],
    description: 'Return list category',
  })
  @Get()
  getCategories(): Promise<ICategory[]> {
    return this.categoryService.getCategories();
  }

  // [GET] api/v1/categories'
  @ApiOkResponse({
    type: [ICategory],
    description: 'Return list category active',
  })
  @Get('/active')
  getCategoriesActive(): Promise<ICategory[]> {
    return this.categoryService.getCategoriesActive();
  }

  @ApiOkResponse({ type: Boolean, description: 'return status update' })
  @Patch('/:categoryId')
  update(
    @Param('categoryId') updateCategoryId: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(updateCategoryId, updateCategoryDto);
  }
}
