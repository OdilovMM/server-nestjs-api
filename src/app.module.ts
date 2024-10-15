/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { CategoryModule } from './category/category.module';
import { TagModule } from './tag/tag.module';
import { CommentModule } from './comment/comment.module';
config();

@Module({
  imports: [MongooseModule.forRoot(process.env.DB_URL), UserModule, PostModule, CategoryModule, TagModule, CommentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
