/* eslint-disable prettier/prettier */
import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

export type CommentDocument = HydratedDocument<Comment>

@Schema({
    id: false,
    toJSON: {
        virtuals: true,
        transform: function(doc: any, ret:any) {
            delete ret.__v;
            return ret;
        }
    }
})

export class Reply {
    _id?: mongoose.Types.ObjectId;

    @Prop({type: mongoose.Types.ObjectId, ref: 'User', index: true})
    replyBy: string;

    @Prop({index: true})
    replyText: string;

    @Prop()
    replyAt: Date;
}

export class Comment {

    @Prop({type: mongoose.Types.ObjectId, ref: 'Post', index: true})
    postId: string;
    
    _id?: mongoose.Types.ObjectId;

    @Prop({type: mongoose.Types.ObjectId, ref: 'User', index: true})
    commentBy: string;

    @Prop({index: true})
    commentText: string;

    @Prop()
    commentAt: Date;

    @Prop([{type: Reply, default: []}])
    replies: Reply[]
}


export const CommentSchema = SchemaFactory.createForClass(Comment);