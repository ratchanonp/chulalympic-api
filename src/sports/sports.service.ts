import { Injectable, Query } from '@nestjs/common';
import { Sport, SportCategory } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSportDto } from './dto/create-sport.dto';
import { UpdateSportDto } from './dto/update-sport.dto';

@Injectable()
export class SportsService {
  constructor(private readonly prisma: PrismaService) { }

  async createCategoryV2(data: SportCategory) {
    return this.prisma.sportCategory.create({
      data,
    });
  }

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

  async create(data: CreateSportDto): Promise<Sport> {
    // Check sport code exists
    const sport = await this.prisma.sport.findUnique({
      where: { code: data.code },
    });
    if (sport) {
      throw new Error('Sport code already exists');
    }

    return this.prisma.sport.create({
      data: {
        code: data.code,
        name: data.name,
        category: {
          createMany: {
            data: data.category.map((category) => ({
              code: category.code,
              name: category.name,
            })),
          },
        },
      },
    });
  }

  async update(code: string, data: UpdateSportDto): Promise<Sport> {
    const oldSport = await this.prisma.sport.findUnique({
      where: { code },
      include: { category: true },
    });
    if (!oldSport) {
      throw new Error('Sport code does not exist');
    }

    const createCategory = data.category
      .filter(
        (category) =>
          !oldSport.category.find(
            (oldCategory) => oldCategory.code === category.code,
          ),
      )
      .map((category) => ({
        code: category.code,
        name: category.name,
        sportCode: code,
      }));

    const updateCategory = data.category
      .filter((category) =>
        oldSport.category.find(
          (oldCategory) => oldCategory.code === category.code,
        ),
      )
      .map((category) => ({
        code: category.code,
        name: category.name,
        sportCode: code,
      }));

    const deleteCategory = oldSport.category
      .filter(
        (oldCategory) =>
          !data.category.find((category) => category.code === oldCategory.code),
      )
      .map((category) => ({
        code: category.code,
        name: category.name,
        sportCode: code,
      }));

    // console.log('createCategory', createCategory);
    // console.log('updateCategory', updateCategory);
    // console.log('deleteCategory', deleteCategory);

    await this.prisma.$transaction(async () => {
      // Update Sport
      await this.prisma.sport.update({
        where: { code },
        data: { code: data.code, name: data.name },
      });

      // Create Category
      if (createCategory.length > 0) {
        createCategory.forEach(async (category) => {
          await this.prisma.sportCategory.create({
            data: {
              code: category.code,
              name: category.name,
              sport: {
                connect: {
                  code: category.sportCode,
                },
              },
            },
          });
        });
      }

      // Update Category
      if (updateCategory.length > 0) {
        updateCategory.forEach(async (category) => {
          await this.prisma.sportCategory.update({
            where: {
              sportCode_code: {
                sportCode: code,
                code: category.code,
              },
            },
            data: {
              name: category.name,
            },
          });
        });
      }

      // Delete Category
      if (deleteCategory.length > 0) {
        deleteCategory.forEach(async (category) => {
          await this.prisma.sportCategory.delete({
            where: {
              sportCode_code: {
                sportCode: code,
                code: category.code,
              },
            },
          });
        });
      }
    });

    return this.prisma.sport.findUnique({
      where: { code: code },
      include: { category: true },
    });
  }

  async delete(code: string): Promise<Sport> {
    const sport = await this.prisma.sport.findUnique({ where: { code } });
    if (!sport) {
      throw new Error('Sport code does not exist');
    }

    return this.prisma.sport.delete({ where: { code } });
  }
}
