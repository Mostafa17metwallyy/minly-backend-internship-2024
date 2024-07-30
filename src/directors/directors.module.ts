import { Module } from '@nestjs/common';
import { DirectorController } from '../directors/directors.controller';
import { DirectorsService } from '../directors/directors.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Directors } from 'src/entities/director.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Directors])],
  controllers: [DirectorController],
  providers: [DirectorsService]
})
export class DirectorsModule {}
