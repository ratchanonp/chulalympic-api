import { Injectable } from '@nestjs/common';
import { Venue } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';
import { VenueFilter } from './interface/venue.interface';

@Injectable()
export class VenuesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createVenueDto: CreateVenueDto): Promise<Venue> {
    const { name } = createVenueDto;
    return this.prisma.venue.create({
      data: {
        name,
      },
    });
  }

  async findAll(filter: VenueFilter): Promise<Venue[]> {
    const { skip, take, cursor, where, orderBy } = filter;
    return this.prisma.venue.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async update(id: number, updateVenueDto: UpdateVenueDto): Promise<Venue> {
    return this.prisma.venue.update({
      where: { id },
      data: updateVenueDto,
    });
  }

  async remove(id: number): Promise<Venue> {
    return this.prisma.venue.delete({
      where: { id },
    });
  }
}
