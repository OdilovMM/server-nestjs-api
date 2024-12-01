/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { AuthenticationGuard } from 'src/utility/guards/authentication.guard';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { User } from 'src/user/models/user.model';
import { Comment } from './models/comment.model';
import { CreateReplyDto } from './dto/create-reply.dto';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  // TODO adding a new comment
  @Post('add-comment')
  @UseGuards(AuthenticationGuard)
  async create(
    @Body() createCommentDto: CreateCommentDto,
    @CurrentUser() currentUser: User,
  ): Promise<Comment> {

    return await this.commentService.create(createCommentDto, currentUser);
  }

  // TODO get comments

  @Get('/:id')
  // @UseGuards(AuthenticationGuard)
  async findAll(@Param('id') id: string): Promise<Comment[]> {
    return await this.commentService.findAll(id);
  }

   // TODO getting single comment
  @Get('/single/:commentId')
  @UseGuards(AuthenticationGuard)
  async findOne(@Param('commentId') commentId: string): Promise<Comment>  {
    return await this.commentService.findOne(commentId);
  }


   // TODO getting single comment
  @Post('/replies')
  @UseGuards(AuthenticationGuard)
  async createReply(@Body() createReplyDto: CreateReplyDto, @CurrentUser() currentUser: User) {
    return await this.commentService.createReply(createReplyDto, currentUser)
  }

}
