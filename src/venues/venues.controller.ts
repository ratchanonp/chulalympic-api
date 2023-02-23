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
import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';
import { VenueFilter } from './interface/venue.interface';
import { VenuesService } from './venues.service';

@Controller('venues')
export class VenuesController {
  constructor(private readonly venuesService: VenuesService) {}

  @Post()
  create(@Body() createVenueDto: CreateVenueDto) {
    return this.venuesService.create(createVenueDto);
  }

  @Get()
  findAll(@Query() query: any) {
    const { skip, take, cursor, where, orderBy } = query;

    const OrderByFilter = orderBy ? JSON.parse(orderBy) : undefined;
    const WhereFilter = where ? JSON.parse(where) : undefined;
    const CursorFilter = cursor ? JSON.parse(cursor) : undefined;

    const filter: VenueFilter = {
      skip: Number(skip) || 0,
      take: Math.min(Number(take) || 30, 30),
      cursor: CursorFilter,
      where: WhereFilter,
      orderBy: OrderByFilter,
    };

    return this.venuesService.findAll(filter);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVenueDto: UpdateVenueDto) {
    return this.venuesService.update(+id, updateVenueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.venuesService.remove(+id);
  }
}
