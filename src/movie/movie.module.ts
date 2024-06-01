import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genre } from 'src/genre/entity/genre.entity';
import { Movie } from './entity/movie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, Genre])],
  controllers: [MovieController],
  providers: [MovieService]
})
export class MovieModule {}
