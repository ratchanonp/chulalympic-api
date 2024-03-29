import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Game } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { GameFilter } from './interface/game.interface';

@Injectable()
export class GamesService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createGameDto: CreateGameDto): Promise<Game> {
    const {
      venueId,
      sportCode,
      sportCategoryCode,
      start,
      end,
      status,
      type,
      participants,
    } = createGameDto;

    const numberOfGameInSport = await this.prisma.game.count({
      where: {
        sportCode: sportCode,
        sportCategoryCode: sportCategoryCode,
      },
    });

    const endNumber = String(numberOfGameInSport + 1).padStart(4, '0');
    const gameId = `${sportCode}-${sportCategoryCode}-${endNumber}`;

    Logger.log('Create game with id: ' + gameId);

    return this.prisma.game.create({
      data: {
        id: gameId,
        venue: {
          connect: {
            id: venueId,
          },
        },
        sport: {
          connect: {
            code: sportCode,
          },
        },
        sportCategory: {
          connect: {
            sportCode_code: {
              sportCode: sportCode,
              code: sportCategoryCode,
            },
          },
        },
        participant: {
          createMany: {
            data: participants,
          },
        },
        start,
        end,
        status,
        type,
      },
    });
  }

  async findAll(filter: GameFilter): Promise<Game[]> {
    const games = await this.prisma.game.findMany({
      ...filter,
      orderBy: [{ start: 'asc' }, { id: 'asc' }], // sort by start date
      include: {
        sport: true,
        sportCategory: true,
        venue: true,
        participant: {
          include: {
            faculty: true,
          },
        },
      },
    });

    // if empty array, throw 404
    if (games.length === 0) {
      throw new NotFoundException('No games found');
    }

    return games;
  }

  async findOne(id: string): Promise<Game> {
    return this.prisma.game.findUniqueOrThrow({
      where: { id: id },
      include: {
        sport: true,
        sportCategory: true,
        venue: true,
        participant: true,
      },
    });
  }

  async update(id: string, updateGameDto: UpdateGameDto): Promise<Game> {
    const { participants, ...data } = updateGameDto;

    const createParticipant = participants
      .filter((participant) => !participant.id)
      .map((participant) => ({
        ...participant,
        gameId: id,
      }));
    const updateParticipant = participants
      .filter((participant) => participant.id)
      .map((participant) => ({ ...participant, gameId: id }));

    const game = await this.prisma.game.findUnique({
      where: { id: id },
      include: { participant: true },
    });

    const deleteParticipant = game.participant.filter(
      (participant) => !participants.find((p) => p.id === participant.id),
    );

    await this.prisma.$transaction(async () => {
      // Update Game
      await this.prisma.game.update({ where: { id: id }, data: data });

      // Create Participant
      if (createParticipant.length > 0) {
        createParticipant.forEach(async (participant) => {
          await this.prisma.participant.create({
            data: {
              scoreType: participant.scoreType,
              value: participant.value,
              medal: participant.medal,
              faculty: {
                connect: {
                  id: participant.facultyId,
                },
              },
              game: {
                connect: { id: id },
              },
            },
          });
        });
      }

      // Update Participant
      if (updateParticipant.length > 0) {
        updateParticipant.forEach(async (participant) => {
          await this.prisma.participant.update({
            where: {
              id: participant.id,
            },
            data: participant,
          });
        });
      }

      // Delete Participant
      if (deleteParticipant.length > 0) {
        deleteParticipant.forEach(async (participant) => {
          await this.prisma.participant.delete({
            where: {
              id: participant.id,
            },
          });
        });
      }
    });

    return this.prisma.game.findUniqueOrThrow({ where: { id: id } });
  }

  async remove(id: string): Promise<Game> {
    return this.prisma.game.delete({
      where: { id: id },
    });
  }

  // async scored(id: string, updateScoreDTO: UpdateScoreDTO): Promise<Game> {
  //   const { participants } = updateScoreDTO;

  //   const game = await this.prisma.game.findUnique({ where: { id: id } });
  //   if (!game) {
  //     throw new Error('Game not found');
  //   }

  //   return this.prisma.$transaction(async () => {
  //     //Update Game Status
  //     await this.prisma.game.update({
  //       where: { id: id },
  //       data: {
  //         status: 'SCORED',
  //       },
  //     });

  //     //Update Each Participant Score
  //     participants.forEach(async ({ facultyId, scoreType, value, medal }) => {
  //       await this.prisma.participant.update({
  //         where: {
  //           gameId_facultyId: {
  //             gameId: id,
  //             facultyId: facultyId,
  //           },
  //         },
  //         data: {
  //           scoreType,
  //           value,
  //           medal,
  //         },
  //       });
  //     });

  //     return await this.prisma.game.findUnique({ where: { id: id } });
  //   });
  // }

  async getDates(): Promise<string[]> {
    // Get Distinct Dates from start
    const dates = await this.prisma.game.findMany({
      select: {
        start: true,
      },
      orderBy: {
        start: 'asc',
      },
      distinct: ['start'],
    });

    const date = dates.map((date) => date.start.toISOString().split('T')[0]);
    return [...new Set(date)];
  }
}
