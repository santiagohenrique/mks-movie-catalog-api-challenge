import { Module } from '@nestjs/common';
import { MovieModule } from './movie/movie.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenreModule } from './genre/genre.module';
import { Movie } from './movie/entity/movie.entity';
import { Genre } from './genre/entity/genre.entity';
import { UserModule } from './user/user.module';
import { User } from './user/entity/user.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
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
    MovieModule, GenreModule, UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
