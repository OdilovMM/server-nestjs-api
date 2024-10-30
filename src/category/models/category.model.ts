/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";


export type CategoryDocument = HydratedDocument<Category>;

@Schema({
    id: false,
    toJSON: {
        virtuals: true,
        transform: function (doc: any, ret: any) {
            delete ret.__v;
            ret;
        }
    }
})

export class Category {
    _id?: mongoose.Types.ObjectId;

    @Prop()
    title: string;

    @Prop()
    description: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);