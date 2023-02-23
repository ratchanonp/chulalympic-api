import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { UpdateScoreDTO } from './dto/update-score.dto';
import { GamesService } from './games.service';
import { GameFilter } from './interface/game.interface';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  create(@Body() createGameDto: CreateGameDto) {
    return this.gamesService.create(createGameDto);
  }

  @Get()
  findAll(@Query() query: any) {
    const where: Prisma.GameWhereInput = {};

    const { venueId, sportCode, sportCategoryCode, facultyId } = query;
    const { skip, take } = query;

    const venueIdArray = venueId ? venueId.split(',') : venueId;
    const sportCodeArray = sportCode ? sportCode.split(',') : sportCode;
    const sportCategoryCodeArray = sportCategoryCode
      ? sportCategoryCode.split(',')
      : sportCategoryCode;
    const facultyIdArray = facultyId ? facultyId.split(',') : facultyId;

    if (venueIdArray) where.venueId = { in: venueIdArray };
    if (sportCodeArray) where.sportCode = { in: sportCodeArray };
    if (sportCategoryCodeArray)
      where.sportCategoryCode = { in: sportCategoryCodeArray };
    if (facultyIdArray) {
      where.participant = {
        some: {
          facultyId: {
            in: facultyIdArray,
          },
        },
      };
    }

    const filter: GameFilter = {
      skip: Number(skip) || 0,
      take: Math.min(Number(take) || 30, 30),
      where,
    };

    return this.gamesService.findAll(filter);
  }

  @Post(':id/score')
  updateScore(@Param('id') id: string, @Body() updateScoreDto: UpdateScoreDTO) {
    return this.gamesService.scored(id, updateScoreDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gamesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto) {
    return this.gamesService.update(id, updateGameDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gamesService.remove(id);
  }
}
