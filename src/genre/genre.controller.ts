import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { GenreDto } from './dto/genre.dto';
import { GenreService } from './genre.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Genre } from 'src/entities/genre.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@UseGuards(AuthGuard)
@ApiTags('genres')
@ApiBearerAuth()
@Controller('genre')
export class GenreController {

    constructor(private genreService: GenreService) {}

    @Get()
    async findAll(): Promise<Genre[]> {
        return this.genreService.findAll();
    }

    @Get("/:id")
    async findById(@Param('id') id: string): Promise<Genre>{
        return await this.genreService.findById(id);
    }

    @Post()
    async create(@Body() createGenreRequest: GenreDto): Promise<Genre> {
        return await this.genreService.create(createGenreRequest);
    }

    @Put("/:id")
    async update(@Param('id') id:string, @Body() genreUpdateRequest: GenreDto): Promise<GenreDto>{
        return await this.genreService.update(id, genreUpdateRequest);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete("/:id")
    async delete(@Param('id') id: string): Promise<void>{
        try{
            return await this.genreService.delete(id);
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.NOT_FOUND,
                    error: error.message,
                },
                HttpStatus.NOT_FOUND,
            );
        }
    }


}
