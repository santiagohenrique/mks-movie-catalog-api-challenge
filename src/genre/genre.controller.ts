import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { GenreDto } from './dto/genre.dto';
import { Genre } from './entity/genre.entity';
import { GenreService } from './genre.service';

@Controller('genre')
export class GenreController {

    constructor(private genreService: GenreService) {}

    @Get()
    async findAll(): Promise<Genre[]> {
        return this.genreService.findAll();
    }

    @Get("/:id")
    async findById(@Param('id') id): Promise<Genre>{
        return await this.genreService.findById(id);
    }

    @Post()
    async create(@Body() createGenreRequest: GenreDto): Promise<Genre> {
        return await this.genreService.create(createGenreRequest);
    }

    @Put("/:id")
    async update(@Param('id') id:string, @Body() genreUpdateRequest: GenreDto): Promise<GenreDto>{
        return await this.genreService.update(id, genreUpdateRequest);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete("/:id")
    async delete(@Param('id') id): Promise<void>{
        return await this.genreService.delete(id);
    }


}
