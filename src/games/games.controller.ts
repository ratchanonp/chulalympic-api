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

    console.log(query);

    const { venueId, sportCode, sportCategoryCode, facultyId, date } = query;
    const { skip, take } = query;

    let venueIdArray = venueId ? venueId.split(',') : venueId;
    if (venueIdArray) venueIdArray = venueIdArray?.map((id) => Number(id));

    const sportCodeArray = sportCode ? sportCode.split(',') : sportCode;
    const sportCategoryCodeArray = sportCategoryCode
      ? sportCategoryCode.split(',')
      : sportCategoryCode;

    let facultyIdArray = facultyId ? facultyId.split(',') : facultyId;
    if (facultyIdArray)
      facultyIdArray = facultyIdArray?.map((id) => Number(id));

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

    // date is ISO string remove time
    const todayFromDate = new Date(date);
    todayFromDate.setHours(0, 0, 0, 0);
    const tommorowFromDate = new Date(date);
    tommorowFromDate.setHours(0, 0, 0, 0);
    tommorowFromDate.setDate(tommorowFromDate.getDate() + 1);

    where.start = date
      ? {
          gte: todayFromDate,
          lt: tommorowFromDate,
        }
      : undefined;

    console.log(where);

    const filter: GameFilter = {
      skip: Number(skip) || 0,
      // take: Math.min(Number(take) || 30, 30),
      where,
    };

    return this.gamesService.findAll(filter);
  }

  @Get('dates')
  getDates() {
    return this.gamesService.getDates();
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
