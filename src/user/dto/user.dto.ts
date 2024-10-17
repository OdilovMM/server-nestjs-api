/* eslint-disable prettier/prettier */
import { Exclude, Expose } from "class-transformer";
import mongoose from "mongoose";

export class UserDto {
    @Expose()
    _id: mongoose.Types.ObjectId;

    @Expose()
    name: string;

    @Expose()
    email: string;

    @Expose()
    avatar: string;

    @Expose()
    roles: string[];

    @Expose()
    createdAt?: Date;

    @Expose()
    updatedAt?: Date;

    @Exclude()
    password: string;

}