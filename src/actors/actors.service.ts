import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Actor } from 'src/entities/actor.entity';
import { Like, Repository } from 'typeorm';
import { CreateActorDto } from './dtos/createActorDto';

@Injectable()
export class ActorsService {
  constructor(
    @InjectRepository(Actor)
    private actorsRepository: Repository<Actor>,
  ) {}
  async createActor(CreateActorDto: CreateActorDto): Promise<Actor> {
    return await this.actorsRepository.save(CreateActorDto);
  }
  async findAllActors(): Promise<Actor[]> {
    return this.actorsRepository.find();
  }

  async searchActors(name?: string): Promise<Actor[]> {
    const searchCriteria: any = {};

    if (name) {
      searchCriteria.name = Like(`%${name}%`);
    }
    return await this.actorsRepository.find({ where: searchCriteria });
  }

  async getActorById(id: number): Promise<Actor> {
    console.log(`Fetching actor with ID: ${id}`); // Debug log
    const actor = await this.actorsRepository.findOne({
      where: { id },
      relations: ['movies', 'awards'],
    });

    if (!actor) {
      console.log(`Actor with ID ${id} not found`); // Debug log
      throw new NotFoundException(`Actor with ID ${id} not found`);
    }

    console.log(`Found actor: ${JSON.stringify(actor)}`); // Debug log
    return actor;
  }
}
