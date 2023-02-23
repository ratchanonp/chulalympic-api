import { Medal, ScoreType } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdateScoreDTO {
  @Type(() => ParticipantScore)
  @IsNotEmpty()
  participants: ParticipantScore[];
}

export class ParticipantScore {
  @IsNumber()
  @IsNotEmpty()
  facultyId: number;

  @IsEnum(ScoreType)
  @IsNotEmpty()
  scoreType: ScoreType;

  @IsEnum(Medal)
  @IsNotEmpty()
  value: number;

  @IsEnum(Medal)
  @IsOptional()
  medal: Medal;
}
