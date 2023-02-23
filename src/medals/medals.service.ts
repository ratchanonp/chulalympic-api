import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { MedalFilter } from './interface/medal.interface';

@Injectable()
export class MedalsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(filter?: MedalFilter) {
    const { facultyId } = filter;
    const whereFilter: Prisma.MedalCountWhereInput = {};

    if (facultyId) whereFilter.id = facultyId;

    return this.prisma.medalCount.findMany({
      where: whereFilter,
    });
  }
}
