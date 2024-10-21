/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
    @IsNotEmpty({message: 'Title should be provided'})
    @IsString({message: 'Category should be string'})
    title: string;

    @IsNotEmpty({message: 'Description should be provided'})
    @IsString({message: 'Description should be string'})
    description: string;
}
