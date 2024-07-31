import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Actor } from 'src/entities/actor.entity';
import { ActorRepository } from '../repo/actor.repository';

@Injectable()
export class ActorsService {
  constructor(
    @InjectRepository(ActorRepository)
    private actorsRepository: ActorRepository,
  ) {}

  async findAllActors(): Promise<Actor[]> {
    try {
      return await this.actorsRepository.find();
    } catch (error) {
      throw new HttpException(
        `Failed to retrieve actors, ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async searchActors(name?: string): Promise<Actor[]> {
    try {
      return await this.actorsRepository.searchByName(name);
    } catch (error) {
      throw new HttpException(
        `Failed to search actors, ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getActorByUuId(uuId: string): Promise<Actor> {
    try {
      const actor = await this.actorsRepository.findOneWithRelations(uuId);

      if (!actor) {
        throw new NotFoundException(`Actor with ID ${uuId} not found`);
      }
      return actor;
    } catch (error) {
      throw new HttpException(
        `Failed to retrieve actor, ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
