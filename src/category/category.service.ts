/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category, CategoryDocument } from './models/category.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = await this.categoryModel.create(createCategoryDto);
    return category;
  }

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find();
  }
}
