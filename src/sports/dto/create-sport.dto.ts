import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateSportDto {
  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsArray()
  category: SportCategoryDto[];
}

class SportCategoryDto {
  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}
