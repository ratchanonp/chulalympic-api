import { Controller, Get, Param, Query } from '@nestjs/common';
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

  @Get(':code')
  findOne(@Param('code') code: string) {
    return this.sportsService.findOne({
      code,
    });
  }
}
