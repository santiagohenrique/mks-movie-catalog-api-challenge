import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { GenreDto } from './dto/genre.dto';
import { Genre } from 'src/entities/genre.entity';

@Injectable()
export class GenreService {

    constructor(
        @InjectRepository(Genre)
        private genreRepository: Repository<Genre>,
    ) {}

    async findAll(): Promise<Genre[]> {
        return await this.genreRepository.find();
    }

    async findById(id: string): Promise<Genre>{
        const genreFound = await this.genreRepository.findOne({ where: {id : id}});
        if(!genreFound){
            throw new NotFoundException(`Genre with id ${id} not found!`)
        }
        return genreFound;
    }

    async update(id: string, genreDtoRequest: GenreDto): Promise<GenreDto>{
        const genreToUpdate = await this.genreRepository.findOne({ where: {id : id}});
        if(!genreToUpdate){
            throw new NotFoundException(`Genre with id ${id} not found!`)
        }
        genreToUpdate.name = genreDtoRequest.name;

        await this.genreRepository.save(genreToUpdate);

        const updatedGenreDto: GenreDto = {
            name: genreToUpdate.name
        }

        return updatedGenreDto;
    }

    async create(createGenreRequest: GenreDto): Promise<Genre> {
        const genre = await this.genreRepository.create(createGenreRequest);
        return this.genreRepository.save(genre);
    }

    async delete(id: string): Promise<void>{
        const genreFound = await this.genreRepository.findOne({ where: {id : id}});

        if(!genreFound){
            throw new NotFoundException(`Genre with id ${id} not found!`)
        }

        try {
            await this.genreRepository.remove(genreFound);
        } catch (error) {
            if (error instanceof QueryFailedError) {
                throw new BadRequestException(
                    'Cannot delete genre as it is associated with one or more movies.'
                );
            }
            throw error;
        }

    }

}
