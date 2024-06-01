import { IsString, IsUUID, IsInt, IsNumber } from 'class-validator';

export class CreateMovieDto {
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