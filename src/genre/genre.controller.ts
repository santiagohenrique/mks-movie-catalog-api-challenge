import { Body, Controller, Get, Post } from '@nestjs/common';
import { GenreService } from './genre.service';
import { Genre } from './entity/genre.entity';
import { CreateGenreDto } from './dto/create-genre.dto';

@Controller('genre')
export class GenreController {

    constructor(private genreService: GenreService) {}

    @Get()
    async findAll(): Promise<Genre[]> {
        return this.genreService.findAll();
    }

    @Post()
    async create(@Body() createGenreDto: CreateGenreDto): Promise<Genre> {
        return await this.genreService.create(createGenreDto);
    }


}
