import { OmitType, PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { CreateGameDto, Participant } from './create-game.dto';

export class UpdateGameDto extends PartialType(
  OmitType(CreateGameDto, ['participants']),
) {
  @IsOptional()
  @Type(() => Participant)
  @ValidateNested()
  participants: UpdateParticipantDto[];
}

export class UpdateParticipantDto extends PartialType(Participant) {
  id: number;
}
