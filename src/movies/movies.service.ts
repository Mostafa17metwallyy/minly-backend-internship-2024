import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from 'src/entities/movie.entity';
import { Like, Repository } from 'typeorm';
import { CreateMovieDto } from './dtos/createMovieDto';

@Injectable()
export class MoviesService {
    constructor(
        @InjectRepository(Movie)
        private movieRepository: Repository<Movie>,
      ) {}
      async createMovie(createMovieDto: CreateMovieDto): Promise<Movie> {
        return await this.movieRepository.save(createMovieDto);
    }
    async findAll() : Promise<Movie[]> {
        return  this.movieRepository.find();
    }

    async searchMovies(title?: string): Promise<Movie[]> {
        const searchCriteria: any = {};
    
        if (title) {
          searchCriteria.title = Like(`%${title}%`);
        }
        return await this.movieRepository.find({ where: searchCriteria });
      }

      async getSortedMovies(
        sortBy: 'releaseDate' | 'rating',
        page: number,
        limit: number,
      ): Promise<{ data: Movie[]; count: number }> {
        const order: any = {};
    
        if (sortBy === 'releaseDate') {
          order.releaseDate = 'DESC';
        } else if (sortBy === 'rating') {
          order.rating = 'DESC';
        }
    
        const [result, total] = await this.movieRepository.findAndCount({
          order,
          skip: (page - 1) * limit,
          take: limit,
        });
    
        return { data: result, count: total };
      }
    }
