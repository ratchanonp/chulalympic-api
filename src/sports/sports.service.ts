import { Injectable, Query } from '@nestjs/common';
import { Sport, SportCategory } from '@prisma/client';
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

  async createCategory(
    sportCode: string,
    data: Omit<SportCategory, 'sportCode'>,
  ): Promise<SportCategory> {
    // Check sport code exists
    const sport = await this.prisma.sport.findUnique({
      where: { code: sportCode },
    });
    if (!sport) {
      throw new Error('Sport code does not exist');
    }

    // Check category code exists
    const category = await this.prisma.sportCategory.findUnique({
      where: {
        sportCode_code: {
          sportCode,
          code: data.code,
        },
      },
    });
    if (category) {
      throw new Error('Category code already exists');
    }

    return this.prisma.sportCategory.create({
      data: {
        ...data,
        sportCode,
      },
    });
  }

  async findCategories(code: string): Promise<SportCategory[]> {
    return this.prisma.sportCategory.findMany({
      where: {
        sportCode: code,
      },
    });
  }
}
