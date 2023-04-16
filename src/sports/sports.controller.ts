import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateSportDto } from './dto/create-sport.dto';
import { UpdateSportDto } from './dto/update-sport.dto';
import { SportFilter } from './interface/sport.interface';
import { SportsService } from './sports.service';

@Controller('sports')
export class SportsController {
  constructor(private readonly sportsService: SportsService) {}

  @Get()
  findAll(@Query() query: any) {
    const { skip, take, cursor, where, orderBy } = query;

    const OrderByFilter = orderBy ? JSON.parse(orderBy) : undefined;
    const CursorFilter = cursor ? JSON.parse(cursor) : undefined;
    const WhereFilter = where ? JSON.parse(where) : undefined;

    const filter: SportFilter = {
      skip: Number(skip) || 0,
      take: Math.min(Number(take) || 30, 30),
      cursor: CursorFilter,
      where: WhereFilter,
      orderBy: OrderByFilter,
    };

    return this.sportsService.findAll(filter);
  }

  @Post()
  create(@Body() data: CreateSportDto) {
    return this.sportsService.create(data);
  }

  @Put(':code')
  update(@Param('code') code: string, @Body() data: UpdateSportDto) {
    return this.sportsService.update(code, data);
  }

  @Delete(':code')
  delete(@Param('code') code: string) {
    return this.sportsService.delete(code);
  }

  @Post('/categories')
  createCategoryV2(@Body() data: any) {
    return this.sportsService.createCategoryV2(data);
  }

  @Get(':code')
  findOne(@Param('code') code: string) {
    return this.sportsService.findOne(code);
  }

  @Get(':code/categories')
  findCategories(@Param('code') code: string) {
    return this.sportsService.findCategories(code);
  }

  @Post(':code/categories')
  createCategory(@Param('code') code: string, @Body() data: any) {
    return this.sportsService.createCategory(code, data);
  }
}
