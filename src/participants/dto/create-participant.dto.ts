import { Medal, ScoreType } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';

export class CreateParticipantDto {
  facultyId: number;

  @IsEnum(ScoreType)
  scoreType: ScoreType;

  value: number;

  @IsEnum(Medal)
  @IsOptional()
  medal?: Medal;

  gameId: string;
}
