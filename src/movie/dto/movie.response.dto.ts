import { IsUUID, IsString, IsInt, IsNumber } from "class-validator";

export class MovieResponseDto {
    @IsUUID()
    id: string;

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