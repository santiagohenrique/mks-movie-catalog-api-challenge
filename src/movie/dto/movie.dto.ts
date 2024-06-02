import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsInt, IsNumber, IsNotEmpty, IsOptional } from 'class-validator';

export class MovieDto {

    @IsUUID()
    @IsOptional()
    id?: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Título do filme.',
        example: 'Matrix'
    })
    title: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Sinopse do filme.',
        example: 'Um programador descobre a verdadeira natureza da realidade e sua luta contra máquinas controladoras.'
    })
    synopsis: string;

    @IsUUID()
    @ApiProperty({
        description: 'ID do gênero do filme.',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    genreId: string;

    @IsInt()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Ano de lançamento do filme.',
        example: 1999
    })
    year: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Nota do filme.',
        example: 8.7
    })
    score: number;
}