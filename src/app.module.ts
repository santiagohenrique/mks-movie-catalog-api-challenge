import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { GenreModule } from './genre/genre.module';
import { MovieModule } from './movie/movie.module';
import { UserModule } from './user/user.module';
import { AppConfig, DatabaseConfig } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true,
      load: [AppConfig, DatabaseConfig]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ...configService.get('database')
      }),
    }), 
    MovieModule, GenreModule, UserModule, AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
