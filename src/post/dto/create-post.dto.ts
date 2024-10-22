/* eslint-disable prettier/prettier */

import { IsArray, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreatePostDto {
    @IsNotEmpty({message: 'Title is required'})
    @IsString({message: 'Title should be string'})
    title: string;

    @IsNotEmpty({message: 'Content is required'})
    @IsString({message: 'Content should be string'})
    content: string;

    @IsNotEmpty({message: 'Excerpt is required'})
    @IsString({message: 'Excerpt should be string'})
    @MaxLength(350, {message: 'Excerpt max length is 350 characters.'})
    excerpt: string;

    @IsNotEmpty({message: 'Images is required'})
    @IsArray({message: 'It should be in array'})
    images: string[];

    @IsNotEmpty({message: 'Category is required'})
    @IsString({message: 'Category should be string'})
    category: string;

    @IsArray({message: 'Tags should be in array format'})
    tags: string[];
}
