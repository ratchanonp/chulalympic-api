import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configuration } from 'src/config/configuration';
import { ParticipantsModule } from 'src/participants/participants.module';
import { AuthModule } from '../auth/auth.module';
import { FacultyModule } from '../faculty/faculty.module';
import { GamesModule } from '../games/games.module';
import { MedalsModule } from '../medals/medals.module';
import { PrismaModule } from '../prisma/prisma.module';
import { SportsModule } from '../sports/sports.module';
import { UsersModule } from '../users/users.module';
import { VenuesModule } from '../venues/venues.module';

import { DashboardModule } from 'src/dashboard/dashboard.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    PrismaModule,
    SportsModule,
    FacultyModule,
    VenuesModule,
    GamesModule,
    ParticipantsModule,
    MedalsModule,
    UsersModule,
    AuthModule,
    DashboardModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: ['.env', '.env.local'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
