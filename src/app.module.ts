import { Module } from '@nestjs/common';
import { MovieModule } from './movie/movie.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenreModule } from './genre/genre.module';
import { Movie } from './movie/entity/movie.entity';
import { Genre } from './genre/entity/genre.entity';
import { UserModule } from './user/user.module';
import { User } from './user/entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5434,
      username: 'mks-user',
      password: 'mks12345',
      database: 'mks-movie-api',
      entities: [Movie, Genre, User],
      synchronize: true,
      logging: true
    }), 
    MovieModule, GenreModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
