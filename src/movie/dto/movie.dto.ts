import { IsString, IsUUID, IsInt, IsNumber, IsNotEmpty, IsOptional } from 'class-validator';

export class MovieDto {

    @IsUUID()
    @IsOptional()
    id?: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    synopsis: string;

    @IsUUID()
    genreId: string;

    @IsInt()
    @IsNotEmpty()
    year: number;

    @IsNumber()
    @IsNotEmpty()
    score: number;
}