import { Controller, Get, Query } from '@nestjs/common';
import { MedalFilter } from './interface/medal.interface';
import { MedalsService } from './medals.service';
@Controller('medals')
export class MedalsController {
  constructor(private readonly medalsService: MedalsService) {}

  @Get()
  findAll(@Query() query: any) {
    const { faculty } = query;

    const filter: MedalFilter = {
      facultyId: Number(faculty),
    };

    return this.medalsService.findAll(filter);
  }
}
