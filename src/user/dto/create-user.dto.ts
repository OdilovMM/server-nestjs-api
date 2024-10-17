/* eslint-disable prettier/prettier */

import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({message: 'Name is required'})
    @IsString({message: 'Name should be string'})
    name: string;

    @IsNotEmpty({message: 'Email is required'})
    @IsEmail({},{message: 'Only valid email is allowed'})
    email: string;

    @IsNotEmpty({message: 'Password is required'})
    @IsString({message: 'Name should be string'})
    @MinLength(5, {message: 'Password should be at least 5 characters'})
    password: string;

    @IsNotEmpty({message: 'Avatar is required'})
    @IsString({message: 'Avatar should be string'})
    avatar: string;
}
