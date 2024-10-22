/* eslint-disable prettier/prettier */
import { IsArray, IsBoolean, IsNotEmpty } from "class-validator";

export class PostApproveDto {
    @IsNotEmpty({message: 'Approve can not be empty'})
    @IsBoolean({message: 'Approve should be in boolean type'})
    approve: boolean;
    
    @IsNotEmpty({message: 'Ids can not be empty'})
    @IsArray({message: 'ids should be in array format'})
    ids: string[];
}