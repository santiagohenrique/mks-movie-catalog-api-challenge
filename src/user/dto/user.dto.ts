import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class UserDto{

    @IsUUID()
    @IsOptional()
    id?: string;

    @IsString()
    @IsNotEmpty()
    fullName: string;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password?: string;

}