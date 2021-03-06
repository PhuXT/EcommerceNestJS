import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CategorysService } from './categorys.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/role.guard';
import { Roles } from '../auth/role.decorator';
import { ROLE_ENUM } from '../users/users.constant';
import { ICategory } from './entity/category.entity';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategorySwanggerRespone } from './dto/swangger/category-swangger.dto';
import {
  BadRequestDto,
  ConFlictExceptionDto,
  InternalServerErrorExceptionDto,
  UnauthorizedExceptionDto,
} from '../swangger/swangger.dto';

@ApiTags('categories')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(ROLE_ENUM.ADMIN)
@ApiInternalServerErrorResponse({
  type: InternalServerErrorExceptionDto,
  description: 'Server error',
})
@ApiUnauthorizedResponse({
  type: UnauthorizedExceptionDto,
  description: 'login with non-admin rights',
})
@Controller('categories')
export class CategorysController {
  constructor(private categoryService: CategorysService) {}

  // [POST] api/v1/categories
  @ApiCreatedResponse({
    type: CategorySwanggerRespone,
    description: 'Return new category',
  })
  @ApiBadRequestResponse({
    type: BadRequestDto,
    description: 'Category Name, image not empty',
  })
  @ApiConflictResponse({
    type: ConFlictExceptionDto,
    description: 'Category Name already exist',
  })
  @Post('/')
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<ICategory> {
    return this.categoryService.create(createCategoryDto);
  }

  // [DELETE] api/v1/categories/:categoryId
  @ApiBody({ type: String })
  @ApiOkResponse({ type: Boolean, description: 'Return boolean' })
  @ApiBadRequestResponse({
    type: BadRequestDto,
    description: "Can't delete category containing products",
  })
  @Delete(':categoryId')
  deleteCategory(@Param('categoryId') categoryId: string): Promise<boolean> {
    return this.categoryService.delete(categoryId);
  }

  // [GET] api/v1/categories'
  @ApiOkResponse({
    type: [CategorySwanggerRespone],
    description: 'Return list category',
  })
  @Get()
  getCategories(): Promise<ICategory[]> {
    return this.categoryService.getCategories();
  }

  // [GET] api/v1/categories/active'
  @ApiOkResponse({
    type: [CategorySwanggerRespone],
    description: 'Return list category active order by prioriry ASC',
  })
  @Get('/active')
  getCategoriesActive(): Promise<ICategory[]> {
    return this.categoryService.getCategoriesActive();
  }

  // [PATCH] api/v1/categories/categoryId'
  @ApiOkResponse({
    type: CategorySwanggerRespone,
    description: 'return category updated',
  })
  @ApiConflictResponse({
    type: ConFlictExceptionDto,
    description: 'Update category name already exist',
  })
  @Patch('/:categoryId')
  update(
    @Param('categoryId') updateCategoryId: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(updateCategoryId, updateCategoryDto);
  }
}
