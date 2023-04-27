import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateParticipantDto } from './dto/create-participant.dto';

@Injectable()
export class ParticipantsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * @deprecated
   * @param data
   * @returns
   */
  async create(data: CreateParticipantDto) {
    return this.prisma.participant.create({
      data: {
        faculty: {
          connect: {
            id: data.facultyId,
          },
        },
        game: {
          connect: {
            id: data.gameId,
          },
        },
        medal: data.medal,
        scoreType: data.scoreType,
        value: data.value,
      },
    });
  }
}
