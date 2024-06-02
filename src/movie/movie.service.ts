import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from 'src/entities/movie.entity';
import { Repository } from 'typeorm';
import { MovieDto } from './dto/movie.dto';
import { Genre } from 'src/entities/genre.entity';

@Injectable()
export class MovieService {

    constructor(
        @InjectRepository(Movie)
        private movieRepository: Repository<Movie>,
        @InjectRepository(Genre)
        private genreRepository: Repository<Genre>,
    ) {}

    async findAll(page: number = 1, limit: number = 10): Promise<{ movies: MovieDto[], total: number }> {
        const [movies, total] = await this.movieRepository.findAndCount({
            relations: ['genre'],
            take: limit,
            skip: (page - 1) * limit,
        });

        const movieDtos = movies.map(movie => this.convertEntityToDto(movie));
        return { movies: movieDtos, total };
    }

    async findById(id: string): Promise<MovieDto> {
        const movie = await this.movieRepository.findOne({ where: { id: id }, relations: ['genre'] });
        if (!movie) {
            throw new NotFoundException(`Movie with ID ${id} not found`);
        }
        return this.convertEntityToDto(movie);
    }
    
    async create(createMovieRequest: MovieDto): Promise<MovieDto> {
        const { genreId, ...movieData } = createMovieRequest;

        const genre = await this.genreRepository.findOne({ where: { id: genreId } });
        if (!genre) {
            throw new NotFoundException(`Genre with ID ${genreId} not found`);
        }

        const movie = this.movieRepository.create({
            ...movieData,
            genre: genre, 
        });

        const savedMovie = await this.movieRepository.save(movie);
        return this.convertEntityToDto(savedMovie);
    }

    async update(id: string, updateMovieRequest: MovieDto): Promise<MovieDto>{
        const movieToUpdate = await this.movieRepository.findOne({ where: { id: id }});

        if(!movieToUpdate){
            throw new NotFoundException(`Movie with ID ${id} not found`);
        }

        const genre = await this.genreRepository.findOne({ where: { id: updateMovieRequest.genreId } });
        if (!genre) {
            throw new NotFoundException(`Genre with ID ${updateMovieRequest.genreId} not found`);
        }

        movieToUpdate.title = updateMovieRequest.title;
        movieToUpdate.synopsis = updateMovieRequest.synopsis;
        movieToUpdate.genre = genre;
        movieToUpdate.year = updateMovieRequest.year;
        movieToUpdate.score = updateMovieRequest.score;

        await this.movieRepository.save(movieToUpdate);

        const updatedMovieDto = this.convertEntityToDto(movieToUpdate);

        return updatedMovieDto;
    }

    async delete(id: string) {
        const movie = await this.movieRepository.findOne({ where: { id: id }, relations: ['genre'] });
        if(!movie){
            throw new NotFoundException(`Movie with ID ${id} not found`);
        }
        await this.movieRepository.remove(movie)
    }

    private convertEntityToDto(movieEntity: Movie): MovieDto{
        const movieDto: MovieDto = {
            id: movieEntity.id,
            title: movieEntity.title,
            synopsis: movieEntity.synopsis,
            genreId: movieEntity.genre.id,
            year: movieEntity.year,
            score: movieEntity.score,
        };
        return movieDto;
    }

    
}
