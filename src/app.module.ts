import { Module } from '@nestjs/common';
import { MovieModule } from './movie/movie.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenreModule } from './genre/genre.module';
import { Movie } from './movie/entity/movie.entity';
import { Genre } from './genre/entity/genre.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5434,
      username: 'mks-user',
      password: 'mks12345',
      database: 'mks-movie-api',
      entities: [Movie, Genre],
      synchronize: true,
      logging: true
    }), 
    MovieModule, GenreModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
