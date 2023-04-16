import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateSportDto {
  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsArray()
  category: SportCategory[];
}

class SportCategory {
  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}
