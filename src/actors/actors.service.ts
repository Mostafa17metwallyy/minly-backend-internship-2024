import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Actor } from 'src/entities/actor.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class ActorsService {
  constructor(
    @InjectRepository(Actor)
    private actorsRepository: Repository<Actor>,
  ) {}

  async findAllActors(): Promise<Actor[]> {
    try {
      return await this.actorsRepository.find();
    } catch (error) {
      throw new HttpException(`Failed to retrieve actors, ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async searchActors(name?: string): Promise<Actor[]> {
    try {
      const searchCriteria: any = {};
      if (name) {
        searchCriteria.name = Like(`%${name}%`);
      }
      return await this.actorsRepository.find({ where: searchCriteria });
    } catch (error) {
      throw new HttpException(`Failed to search actors, ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getActorByUuId(uuId: string): Promise<Actor> {
    try {
      const actor = await this.actorsRepository.findOne({
        where: { uuId },
        relations: ['awards', 'movieActorActors', 'movieActorActors.movie'],
      });

      if (!actor) {
        throw new NotFoundException(`Actor with ID ${uuId} not found`);
      }
      return actor;
    } catch (error) {
      throw new HttpException(`Failed to retrieve actor, ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
