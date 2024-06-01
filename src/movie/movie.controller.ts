import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { MovieDto } from './dto/movie.dto';
import { Movie } from './entity/movie.entity';
import { MovieService } from './movie.service';

@Controller('movie')
export class MovieController {

    constructor(private movieService: MovieService){};

    @Get()
    async findAll(): Promise<MovieDto[]> {
        return await this.movieService.findAll();
    }

    @Get("/:id")
    async findById(@Param('id') id: string): Promise<MovieDto> {
        return await this.movieService.findById(id);
    }

    @Post()
    async create(@Body() createMovieRequest: MovieDto): Promise<Movie> {
        return await this.movieService.create(createMovieRequest);
    }

    @Put("/:id")
    async update(@Param('id') id, @Body() updateMovieRequest: MovieDto): Promise<MovieDto>{
        return await this.movieService.update(id, updateMovieRequest);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete("/:id")
    async delete(@Param('id') id): Promise<void>{
        return await this.movieService.delete(id)
    }


}
