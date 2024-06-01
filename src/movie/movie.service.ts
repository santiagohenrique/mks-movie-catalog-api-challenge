import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Genre } from 'src/genre/entity/genre.entity';
import { Repository } from 'typeorm';
import { MovieDto } from './dto/movie.dto';
import { Movie } from './entity/movie.entity';

@Injectable()
export class MovieService {

    constructor(
        @InjectRepository(Movie)
        private movieRepository: Repository<Movie>,
        @InjectRepository(Genre)
        private genreRepository: Repository<Genre>,
    ) {}

    async findAll(): Promise<MovieDto[]> {
        const movies = await this.movieRepository.find({ relations: ['genre'] });
        return movies.map(movie => ({
            id: movie.id,
            title: movie.title,
            synopsis: movie.synopsis,
            genreId: movie.genre.id, 
            year: movie.year,
            score: movie.score,
        }));
    }

    async findById(id: string): Promise<MovieDto> {
        const movie = await this.movieRepository.findOne({ where: { id: id }, relations: ['genre'] });
        if (!movie) {
            throw new NotFoundException(`Movie with ID ${id} not found`);
        }
        return this.convertEntityToDto(movie);
    }
    
    async create(createMovieRequest: MovieDto): Promise<Movie> {
        const { genreId, ...movieData } = createMovieRequest;

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
