import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenreController } from './genre.controller';
import { GenreService } from './genre.service';
import { Genre } from 'src/entities/genre.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Genre])],
    exports: [TypeOrmModule],
    controllers: [GenreController],
    providers: [GenreService],
})
export class GenreModule {
    
}
