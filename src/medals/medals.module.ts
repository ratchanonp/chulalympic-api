import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { MedalsController } from './medals.controller';
import { MedalsService } from './medals.service';

@Module({
  imports: [PrismaModule],
  controllers: [MedalsController],
  providers: [MedalsService],
})
export class MedalsModule {}
