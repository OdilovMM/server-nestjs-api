/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './models/post.model';

@Module({
  imports: [MongooseModule.forFeature([{name: Post.name, schema: PostSchema}])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
