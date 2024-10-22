/* eslint-disable prettier/prettier */
import { ObjectId } from 'mongodb';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { PostApproveDto } from './dto/post-approve.dto';
import { AuthenticationGuard } from 'src/utility/guards/authentication.guard';
import { AuthorizeGuard } from 'src/utility/guards/authorize.guard';
import { UserRoles } from 'src/utility/user-roles';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { User } from 'src/user/models/user.model';
import { Post as PostClass } from './models/post.model';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseGuards(AuthenticationGuard, AuthorizeGuard([UserRoles.Author]))
  async createPost(
    @Body() createPostDto: CreatePostDto,
    @CurrentUser() currentUser: User,
  ): Promise<PostClass> {
    return await this.postService.create(createPostDto, currentUser);
  }

  // TODO implement query too
  @Get()
  async findAll(@Query() query: any): Promise<{filteredPostCount: number, posts: PostClass[], limit: number}>  {
    return await this.postService.findAll(query) 
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PostClass> {
    return await this.postService.findOne(new ObjectId(id));
  }

  @Patch('/approve')
  @UseGuards(AuthenticationGuard, AuthorizeGuard([UserRoles.Admin]))
  async approvePost(@Body() postApproveDto: PostApproveDto): Promise<any> {
    return await this.postService.approve(postApproveDto);
  }

  @Get('/get/all')
  @UseGuards(AuthenticationGuard, AuthorizeGuard([UserRoles.Admin]))
  async getAllPostByAdmin() {
    return await this.postService.getAllAdminPost();
  }

  @Patch('/:postId/likes')
  @UseGuards(AuthenticationGuard)
  async likes(
    @Param('postId') postId: string,
    @CurrentUser() currentUser: User,
  ): Promise<string[]> {
    return await this.postService.likes(new ObjectId(postId), currentUser);
  }
}
