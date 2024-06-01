import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './entity/movie.entity';
import { Genre } from 'src/genre/entity/genre.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { MovieResponseDto } from './dto/movie.response.dto';

@Injectable()
export class MovieService {

    constructor(
        @InjectRepository(Movie)
        private movieRepository: Repository<Movie>,
        @InjectRepository(Genre)
        private genreRepository: Repository<Genre>,
    ) {}

    async findAll(): Promise<MovieResponseDto[]> {
        const movies = this.movieRepository.find({ relations: ['genre'] });
        return (await movies).map(movie => ({
            id: movie.id,
            title: movie.title,
            synopsis: movie.synopsis,
            genreId: movie.genre.id, 
            year: movie.year,
            score: movie.score,
        }));
    }

    async create(createMovieDto: CreateMovieDto): Promise<Movie> {
        const { genreId, ...movieData } = createMovieDto;

        const genre = await this.genreRepository.findOne({ where: { id: genreId } });
        if (!genre) {
            throw new NotFoundException(`Genre with ID ${genreId} not found`);
        }

        const movie = this.movieRepository.create({
            ...movieData,
            genre: genre, 
        });

        return this.movieRepository.save(movie);
    }
    
}
