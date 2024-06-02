import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenreModule } from 'src/genre/genre.module';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { Movie } from 'src/entities/movie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movie]), GenreModule],
  controllers: [MovieController],
  providers: [MovieService]
})
export class MovieModule {}
