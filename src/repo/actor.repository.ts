import { EntityRepository, Like, Repository } from 'typeorm';
import { Actor } from 'src/entities/actor.entity';

@EntityRepository(Actor)
export class ActorRepository extends Repository<Actor> {
  async findOneWithRelations(uuId: string): Promise<Actor> {
    return this.findOne({
      where: { uuId },
      relations: ['awards', 'movieActorActors', 'movieActorActors.movie'],
    });
  }

  async searchByName(name?: string): Promise<Actor[]> {
    const searchCriteria: any = {};
    if (name) {
      searchCriteria.name = Like(`%${name}%`);
    }
    return this.find({ where: searchCriteria });
  }
}
