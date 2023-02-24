import { Injectable, Query } from '@nestjs/common';
import { Sport } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SportsService {
  constructor(private prisma: PrismaService) { }

  async findAll(@Query() query): Promise<Sport[]> {
    const { skip, take, cursor, where, orderBy } = query;
    return this.prisma.sport.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        category: true,
      },
    });
  }

  async findOne(code: string): Promise<Sport> {
    return this.prisma.sport.findUnique({
      where: {
        code,
      },
    });
  }
}
