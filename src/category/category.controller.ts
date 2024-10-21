/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './models/category.model';
import { AuthenticationGuard } from 'src/utility/guards/authentication.guard';
import { AuthorizeGuard } from 'src/utility/guards/authorize.guard';
import { UserRoles } from 'src/utility/user-roles';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('create-category')
  @UseGuards(AuthenticationGuard, AuthorizeGuard([UserRoles.Admin]))
  async create(@Body() createCategoryDto: CreateCategoryDto): Promise<Category>  {
    return await this.categoryService.create(createCategoryDto);
  }

  @Get()
  async findAll() : Promise<Category[]>  {
    return await this.categoryService.findAll();
  }
  
}
