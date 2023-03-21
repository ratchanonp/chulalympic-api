import { GameStatus, GameType, Medal, ScoreType } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateGameDto {
  @IsNotEmpty()
  @IsNumber()
  venueId: number;

  @IsNotEmpty()
  @IsString()
  sportCode: string;

  @IsNotEmpty()
  @IsString()
  sportCategoryCode: string;

  @IsNotEmpty()
  @IsDateString()
  start: Date;

  @IsOptional()
  @IsDateString()
  end: Date;

  @IsNotEmpty()
  @IsEnum(GameStatus)
  status: GameStatus;

  @IsNotEmpty()
  @IsEnum(GameType)
  type: GameType;

  @IsOptional()
  @Type(() => Participant)
  @ValidateNested()
  participants: Participant[];

  @IsOptional()
  @IsString()
  note?: string;
}

export class Participant {
  @IsNotEmpty()
  @IsNumber()
  facultyId: number;

  @IsOptional()
  @IsEnum(ScoreType)
  scoreType?: ScoreType;

  @IsOptional()
  @IsNumber()
  value?: number;

  @IsOptional()
  @IsEnum(Medal)
  medal?: Medal;

  @IsOptional()
  @IsString()
  note?: string;
}
