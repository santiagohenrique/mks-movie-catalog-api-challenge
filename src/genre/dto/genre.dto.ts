import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GenreDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Nome do gênero de filme.',
        example: 'Ação'
    })
    name: string;
}
