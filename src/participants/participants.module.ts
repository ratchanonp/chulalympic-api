import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ParticipantsController } from './participants.controller';
import { ParticipantsService } from './participants.service';

@Module({
  controllers: [ParticipantsController],
  providers: [ParticipantsService],
  imports: [PrismaModule],
})
export class ParticipantsModule { }
