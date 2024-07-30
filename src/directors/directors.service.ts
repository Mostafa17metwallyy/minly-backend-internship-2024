import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Directors } from 'src/entities/director.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class DirectorsService {
  constructor(
    @InjectRepository(Directors)
    private directorsRepository: Repository<Directors>,
  ) {}

  async findAllDirectors(): Promise<Directors[]> {
    try {
      return await this.directorsRepository.find();
    } catch (error) {
      throw new HttpException(`Failed to retrieve directors, ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async searchDirector(name?: string): Promise<Directors[]> {
    try {
      const searchCriteria: any = {};
      if (name) {
        searchCriteria.name = Like(`%${name}%`);
      }
      return await this.directorsRepository.find({ where: searchCriteria });
    } catch (error) {
      throw new HttpException(`Failed to search directors, ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
