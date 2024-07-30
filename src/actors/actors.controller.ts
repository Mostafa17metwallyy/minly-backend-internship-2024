import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { Actor } from 'src/entities/actor.entity';
import { ActorsService } from './actors.service';

@Controller('actors')
export class ActorsController {
  constructor(private actorsService: ActorsService) {}

  @Get()
  async findAll(): Promise<Actor[]> {
    return this.actorsService.findAllActors();
  }

  @Get('search')
  async search(@Query('name') name: string): Promise<Actor[]> {
    return this.actorsService.searchActors(name);
  }

  @Get(':uuid')
  async getActor(@Param('uuid') uuid: string): Promise<Actor> {
    return this.actorsService.getActorByUuId(uuid);
  }
}
