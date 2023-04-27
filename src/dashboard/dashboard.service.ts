import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Dashboard } from './interfaces/dashboard.interface';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) { }

  async getDashboard(): Promise<Dashboard> {
    const todayGamesList = await this.getTodayGames();
    const latestUpdateGamesList = await this.getLatestUpdateGames();

    const todayGames = todayGamesList.length;
    const todayScoredGames = todayGamesList.filter(
      (game) => game.status === 'SCORED',
    ).length;

    const totalGames = await this.prisma.game.count();
    const totalScoredGames = await this.prisma.game.count({
      where: { status: 'SCORED' },
    });

    const faculty = await this.prisma.faculty.findMany({
      orderBy: { id: 'asc' },
    });
    const facultyParticipation = await this.prisma.participant.groupBy({
      by: ['facultyId'],
      _count: {
        _all: true,
      },
    });

    const facultyMedals = await this.prisma.medalCount.findMany();

    return {
      todayGames,
      todayScoredGames,
      totalGames,
      totalScoredGames,
      todayGamesList,
      latestUpdateGamesList,
      facultyParticipation: faculty
        .map((faculty) => {
          return {
            ...faculty,
            participation:
              facultyParticipation.find(
                (facultyParticipation) =>
                  facultyParticipation.facultyId === faculty.id,
              )?._count._all || 0,
          };
        })
        .sort((a, b) => b.participation - a.participation),
      facultyMedals,
    };
  }

  async getTodayGames() {
    const startToday = new Date(new Date().setHours(0, 0, 0, 0));
    const endToday = new Date(new Date().setHours(23, 59, 59, 999));

    return await this.prisma.game.findMany({
      where: {
        start: {
          gte: startToday,
          lte: endToday,
        },
      },
      include: {
        venue: true,
      },
    });
  }

  async getLatestUpdateGames() {
    return await this.prisma.game.findMany({
      orderBy: {
        updatedAt: 'desc',
      },
      take: 10,
    });
  }
}
