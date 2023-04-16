import { Injectable } from '@nestjs/common';
import { Faculty } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFacultyDto } from './dto/create-faculty.dto';
import { UpdateFacultyDto } from './dto/update-faculty.dto';

@Injectable()
export class FacultyService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createFacultyDto: CreateFacultyDto): Promise<Faculty> {
    return this.prisma.faculty.create({
      data: createFacultyDto,
    });
  }

  async findAll(): Promise<Faculty[]> {
    return this.prisma.faculty.findMany({
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: number): Promise<Faculty> {
    return this.prisma.faculty.findUnique({
      where: { id },
    });
  }

  async update(
    id: number,
    updateFacultyDto: UpdateFacultyDto,
  ): Promise<Faculty> {
    return this.prisma.faculty.update({
      where: { id },
      data: updateFacultyDto,
    });
  }

  async remove(id: number): Promise<Faculty> {
    return this.prisma.faculty.delete({
      where: { id },
    });
  }
}
