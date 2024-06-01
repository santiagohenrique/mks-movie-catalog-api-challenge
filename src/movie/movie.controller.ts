import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from './entity/movie.entity';
import { MovieService } from './movie.service';
import { MovieResponseDto } from './dto/movie.response.dto';

@Controller('movie')
export class MovieController {

    constructor(private movieService: MovieService){}

    @Get()
    async findAll(): Promise<MovieResponseDto[]> {
        return await this.movieService.findAll();
    }

    @Post()
    async create(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
        return await this.movieService.create(createMovieDto);
    }


}
