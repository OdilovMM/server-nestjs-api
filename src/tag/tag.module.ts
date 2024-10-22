/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Tag, TagSchema } from './models/tag.model';

@Module({
  imports: [MongooseModule.forFeature([{name: Tag.name, schema: TagSchema}])],
  controllers: [TagController],
  providers: [TagService],
  exports: [TagService]
})
export class TagModule {}
