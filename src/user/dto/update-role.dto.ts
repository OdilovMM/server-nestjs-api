/* eslint-disable prettier/prettier */
import { ArrayMaxSize, IsArray, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { UserRoles } from "src/utility/user-roles";


export class UpdateUserRolesDto {
    @IsNotEmpty({message: 'user id can not be null'})
    @IsString({message: 'Id should be string'})
    id: string;
    
    
    @IsNotEmpty({message: 'Roles can not be null'})
    @IsEnum(UserRoles, {each: true, message: 'Provided roles may be inaccurate'})
    @IsArray({message: 'Roles format is array'})
    @ArrayMaxSize(3, {message: 'Please, only three roles'})
    roles: string[];
}