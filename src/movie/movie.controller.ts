import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, NotFoundException, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { MovieDto } from './dto/movie.dto';
import { MovieService } from './movie.service';

@UseGuards(AuthGuard)
@ApiTags('movies')
@ApiBearerAuth()
@Controller('movie')
export class MovieController {

    constructor(private movieService: MovieService){};

    @Get()
    @ApiResponse({ status: 200, description: 'Retorna a lista de filmes.', type: MovieDto, isArray: true })
    @ApiQuery({ name: 'page', required: false, type: Number })
    @ApiQuery({ name: 'limit', required: false, type: Number })
    async findAll(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
    ): Promise<{ movies: MovieDto[], total: number }> {
        return await this.movieService.findAll(page, limit);
    }

    @Get("/:id")
    @ApiResponse({ status: 200, description: 'Retorna um filme específico.', type: MovieDto })
    @ApiResponse({ status: 404, description: 'Filme não encontrado.' })
    @ApiParam({ name: 'id', type: String })
    async findById(@Param('id') id: string): Promise<MovieDto> {
        try {
            return await this.movieService.findById(id);
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    @Post()
    @ApiResponse({ status: 201, description: 'Filme criado com sucesso.', type: MovieDto })
    @ApiResponse({ status: 400, description: 'Erro na requisição.' })
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
    @ApiResponse({ status: 200, description: 'Filme atualizado com sucesso.', type: MovieDto })
    @ApiResponse({ status: 400, description: 'Erro na requisição.' })
    @ApiResponse({ status: 404, description: 'Filme não encontrado.' })
    @ApiParam({ name: 'id', type: String })
    async update(@Param('id') id: string, @Body() updateMovieRequest: MovieDto): Promise<MovieDto>{
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
    @ApiResponse({ status: 204, description: 'Filme deletado com sucesso.' })
    @ApiResponse({ status: 400, description: 'Erro na requisição.' })
    @ApiResponse({ status: 404, description: 'Filme não encontrado.' })
    @ApiParam({ name: 'id', type: String })
    async delete(@Param('id') id: string): Promise<void>{
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
