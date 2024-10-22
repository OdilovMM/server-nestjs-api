/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from "class-validator";


export class CreateReplyDto {
    @IsNotEmpty()
    @IsString()
    commentId: string;


    @IsNotEmpty()
    @IsString()
    replyText: string;

}