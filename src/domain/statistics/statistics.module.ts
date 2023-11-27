import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import { StatisticView, StatisticViewSchema } from 'src/schemas/view.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { StatisticsRepo } from './statistics.repo';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: StatisticView.name, schema: StatisticViewSchema },
    ]),
  ],
  providers: [StatisticsService, StatisticsRepo],
  controllers: [StatisticsController]
})
export class StatisticsModule {}
