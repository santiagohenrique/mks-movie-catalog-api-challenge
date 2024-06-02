import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, NotFoundException, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { MovieDto } from './dto/movie.dto';
import { MovieService } from './movie.service';

@UseGuards(AuthGuard)
@Controller('movie')
export class MovieController {

    constructor(private movieService: MovieService){};

    @Get()
    async findAll(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
    ): Promise<{ movies: MovieDto[], total: number }> {
        return await this.movieService.findAll(page, limit);
    }

    @Get("/:id")
    async findById(@Param('id') id: string): Promise<MovieDto> {
        try {
            return await this.movieService.findById(id);
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    @Post()
    async create(@Body() createMovieRequest: MovieDto): Promise<MovieDto> {
        try {
            return await this.movieService.create(createMovieRequest);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new HttpException(
                    {
                        status: HttpStatus.NOT_FOUND,
                        error: error.message,
                    },
                    HttpStatus.NOT_FOUND,
                );
            } else {
                throw new HttpException(
                    {
                        status: HttpStatus.BAD_REQUEST,
                        error: error.message,
                    },
                    HttpStatus.BAD_REQUEST,
                );
            }
        }
    }

    @Put("/:id")
    async update(@Param('id') id, @Body() updateMovieRequest: MovieDto): Promise<MovieDto>{
        try {
            return await this.movieService.update(id, updateMovieRequest);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new HttpException(
                    {
                        status: HttpStatus.NOT_FOUND,
                        error: error.message,
                    },
                    HttpStatus.NOT_FOUND,
                );
            } else {
                throw new HttpException(
                    {
                        status: HttpStatus.BAD_REQUEST,
                        error: error.message,
                    },
                    HttpStatus.BAD_REQUEST,
                );
            }
        }
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete("/:id")
    async delete(@Param('id') id): Promise<void>{
        try {
            await this.movieService.delete(id);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new HttpException(
                    {
                        status: HttpStatus.NOT_FOUND,
                        error: error.message,
                    },
                    HttpStatus.NOT_FOUND,
                );
            } else {
                throw new HttpException(
                    {
                        status: HttpStatus.BAD_REQUEST,
                        error: error.message,
                    },
                    HttpStatus.BAD_REQUEST,
                );
            }
        }
    }


}
