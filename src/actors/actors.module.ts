import { Module } from '@nestjs/common';
import { ActorsController } from './actors.controller';
import { ActorsService } from './actors.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActorRepository } from 'src/repo/actor.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ActorRepository])],
  controllers: [ActorsController],
  providers: [ActorsService]
})
export class ActorsModule {}
