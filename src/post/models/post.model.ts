/* eslint-disable prettier/prettier */
import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

export type PostDocument = HydratedDocument<Post>

@Schema({
    timestamps: true,
    id: false,
    toJSON: {
        virtuals: true,
        transform: function(doc: any, ret:any) {
            delete ret.__v;
            return ret;
        }
    }
})

export class Post {
    _id?: mongoose.Types.ObjectId;

    @Prop({index: true})
    title: string;

    @Prop()
    content: string;

    @Prop()
    images: string[];

    @Prop()
    excerpt: string;

    @Prop({type: mongoose.Types.ObjectId, ref: 'User', index: true})
    author: string;

    @Prop({type: mongoose.Types.ObjectId, ref: 'Category', index: true})
    category: string;

    @Prop({type: mongoose.Types.ObjectId, ref: 'Tag', index: true})
    tags: string[];

    @Prop({type: mongoose.Types.ObjectId, ref: 'User', index: true, default: []})
    likes: string[];

    @Prop({default: 0})
    totalComments: number

    @Prop({default: false, index: true})
    approved: boolean;

    @Prop({type: mongoose.Types.ObjectId, ref: 'User', index: true})
    approvedBy: string;
}


export const PostSchema = SchemaFactory.createForClass(Post);