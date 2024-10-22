/* eslint-disable prettier/prettier */
import { ObjectId } from 'mongodb';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CommentDocument, Comment } from './models/comment.model';
import { User } from 'src/user/models/user.model';
import { PostService } from 'src/post/post.service';
import { CreateReplyDto } from './dto/create-reply.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name)
    private readonly commentModel: Model<CommentDocument>,
    private readonly postService: PostService,
  ) {}

  // TODO adding a new comment
  async create(
    createCommentDto: CreateCommentDto,
    currentUser: User,
  ): Promise<Comment> {
    const post = await this.postService.findOneAndUpdateCommentCount(
      new ObjectId(createCommentDto.postId),
      true,
    );
    const newComment = new this.commentModel({
      postId: post._id.toString(),
      commentBy: currentUser._id.toString(),
      commentText: createCommentDto.commentText.toString(),
      commentAt: new Date(),
    });
    return await this.commentModel.create(newComment);
  }

  // TODO get comments
  async findAll(id: string): Promise<Comment[]> {
    return await this.commentModel
      .find({ postId: id })
      .populate('commentBy', '_id name avatar')
      .populate({
        path: 'replies.replyBy',
        model: 'User',
        select: '_id name avatar',
      })
      .exec();
  }

  // TODO getting single comment
  async findOne(commentId: string): Promise<Comment> {
    const comment = await this.commentModel
      .findById(new ObjectId(commentId))
      .populate('commentBy', '_id name avatar')
      .populate({
        path: 'replies.replyBy',
        model: 'User',
        select: '_id name avatar',
      })
      .exec();
    if (!comment) throw new NotFoundException('Comment not found');
    return comment;
  }

   // TODO Replying to a comment by comment
  async createReply(createReplyDto: CreateReplyDto, currentUser: User) {
    const comment = await this.findOne(createReplyDto.commentId);
    await this.postService.findOneAndUpdateCommentCount(
      new ObjectId(comment.postId),
      true,
    );
    const newReply = {
      _id: new mongoose.Types.ObjectId(),
      replyBy: currentUser._id.toString(),
      replyText: createReplyDto.replyText,
      replyAt: new Date(),
    };
    comment.replies.push(newReply);
    const result = await this.commentModel.findByIdAndUpdate(
      comment._id,
      comment,
      { new: true },
    );
    return result;
  }
}
