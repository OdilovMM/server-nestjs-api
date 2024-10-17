/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class SignInDto {
    @IsNotEmpty({message: 'Email can not be empty'})
    @IsEmail({},{message: 'Please provide a valid email'})
    email: string;
    
    @IsNotEmpty({message: 'Password can not be null'})
    @MinLength(5, {message: 'Password must be at least 5 character'})
    password: string;
}