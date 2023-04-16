import { Faculty, Game, MedalCount } from "@prisma/client";

export interface Dashboard {
    todayGames: number;
    todayScoredGames: number;
    totalGames: number;
    totalScoredGames: number;

    todayGamesList: Game[];
    latestUpdateGamesList: Game[];

    facultyParticipation: FacultyParticipation[];
    facultyMedals: MedalCount[];
}

export interface FacultyParticipation extends Faculty {
    participation: number;
}
