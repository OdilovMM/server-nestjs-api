/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Tag, TagDocument } from './models/tag.model';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';

@Injectable()
export class TagService {
  constructor(
    @InjectModel(Tag.name) private readonly tagModel: Model<TagDocument>,
  ) {}

  async create(createTagDto: CreateTagDto): Promise<Tag> {
    return await this.tagModel.create(createTagDto);
  }

  async findAll(): Promise<Tag[]> {
    return await this.tagModel.find();
  }

  async findOne(id: ObjectId): Promise<Tag> {
    const tag = await this.tagModel.findById(id);
    if (!tag) throw new NotFoundException('Tag not found');
    return tag;
  }
}
