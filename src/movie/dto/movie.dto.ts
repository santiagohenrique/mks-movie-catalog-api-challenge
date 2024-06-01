import { IsString, IsUUID, IsInt, IsNumber } from 'class-validator';

export class MovieDto {

    @IsUUID()
    id?: string;

    @IsString()
    title: string;

    @IsString()
    synopsis: string;

    @IsUUID()
    genreId: string;

    @IsInt()
    year: number;

    @IsNumber()
    score: number;
}