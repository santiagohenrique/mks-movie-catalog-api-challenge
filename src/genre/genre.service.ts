import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GenreDto } from './dto/genre.dto';
import { Genre } from './entity/genre.entity';

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

    async create(createGenreRequest: GenreDto): Promise<Genre> {
        const genre = await this.genreRepository.create(createGenreRequest);
        return this.genreRepository.save(genre);
    }

    async delete(id: string): Promise<void>{
        const genreFound = await this.genreRepository.findOne({ where: {id : id}});

        if(!genreFound){
            throw new NotFoundException(`Genre with id ${id} not found!`)
        }

        await this.genreRepository.remove(genreFound);

    }

}
