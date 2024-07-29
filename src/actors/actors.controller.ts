import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { Actor } from 'src/entities/actor.entity';
import { ActorsService } from './actors.service';
import { CreateActorDto } from './dtos/createActorDto';

@Controller('actors')
export class ActorsController {
    constructor(private actorsService: ActorsService) {}
    @Get()
    async findAll(): Promise<Actor[]> {
        try {
            return await this.actorsService.findAllActors();
          } catch (error) {

            throw new HttpException(`Failed to retrieve actors, ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post()
    async create(@Body() CreateActorDto: CreateActorDto) {
        try {
            return await this.actorsService.createActor(CreateActorDto);
          } catch (error) {
            throw new HttpException(`Failed to retrieve actor, ${error}`, HttpStatus.BAD_REQUEST);
          }
        }

        @Get('search')
        async search(@Query('name') name: string): Promise<Actor[]> {
          try {
            return await this.actorsService.searchActors(name);
          } catch (error) {
            console.error('Error searching actors:', error.message);
            throw new HttpException('Failed to search actors', HttpStatus.INTERNAL_SERVER_ERROR);
          }
        }

        @Get(':uuid')
        async getActor(@Param('uuid') uuid: string): Promise<Actor> {
          console.log(`Received request for actor with ID: ${uuid}`); 
          return this.actorsService.getActorByUuId(uuid);
        }
        
}
