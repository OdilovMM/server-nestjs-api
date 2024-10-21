/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from "class-validator";

export class CreateTagDto {
    @IsString({message: 'Tag should be in string'})
    @IsNotEmpty({message: 'Tag should be provided'})
    title: string;
}
