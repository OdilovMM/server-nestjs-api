/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { Tag } from './models/tag.model';
import { AuthenticationGuard } from 'src/utility/guards/authentication.guard';
import { AuthorizeGuard } from 'src/utility/guards/authorize.guard';
import { UserRoles } from 'src/utility/user-roles';

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post('create-tag')
  @UseGuards(
    AuthenticationGuard,
    AuthorizeGuard([UserRoles.Admin, UserRoles.Author]),
  )
  async createTag(@Body() createTagDto: CreateTagDto): Promise<Tag> {
    return await this.tagService.create(createTagDto);
  }

  @Get()
  async findAll(): Promise<Tag[]> {
    return await this.tagService.findAll();
  }
}
