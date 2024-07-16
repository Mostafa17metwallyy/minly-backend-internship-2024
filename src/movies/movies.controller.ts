import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { get } from 'http';
import { MoviesService } from './movies.service';
import { Movie } from 'src/entities/movie.entity';
import { CreateMovieDto } from './dtos/createMovieDto';

@Controller('movies')
export class MoviesController {
    constructor(private moviesService: MoviesService) {}

    @Get()
    async findAll(): Promise<Movie[]> {
        try {
            return await this.moviesService.findAll();
          } catch (error) {

            throw new HttpException(`Failed to retrieve movies, ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post()
    async create(@Body() createMovieDto: CreateMovieDto) {
        try {
            return await this.moviesService.createMovie(createMovieDto);
          } catch (error) {
            throw new HttpException(`Failed to retrieve movies, ${error}`, HttpStatus.BAD_REQUEST);
          }
        }

        @Get('search')
        async search(@Query('title') title: string): Promise<Movie[]> {
          try {
            return await this.moviesService.searchMovies(title);
          } catch (error) {
            console.error('Error searching movies:', error.message);
            throw new HttpException('Failed to search movies', HttpStatus.INTERNAL_SERVER_ERROR);
          }
        }

        @Get('paginated')
        async getMovies(
          @Query('sortBy') sortBy: 'releaseDate' | 'rating',
          @Query('page') page = 1,
          @Query('limit') limit = 8,
        ): Promise<{ data: Movie[]; count: number }> {
          return this.moviesService.getPaginatedMovies(sortBy, Number(page), Number(limit));
        }
}

