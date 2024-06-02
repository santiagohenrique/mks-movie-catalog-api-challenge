import { IsNotEmpty, IsOptional, IsString, IsUUID, MinLength } from "class-validator";

export class UserDto{

    @IsUUID()
    @IsOptional()
    id?: string;

    @IsString()
    @IsNotEmpty()
    fullName: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    username: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password?: string;

}