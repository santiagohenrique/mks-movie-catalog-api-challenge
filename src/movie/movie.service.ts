import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './entity/movie.entity';

@Injectable()
export class MovieService {

    constructor(@InjectRepository(Movie) private movieRepository: Repository<Movie>){}


    
}
