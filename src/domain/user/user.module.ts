import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepo } from './user.repo';
import { User, UserSchema } from '../auth/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Specialization,
  SpecializationSchema,
} from '../admin/schemas/specialization.schema';
import {
  SavedDoctors,
  SavedDoctorsSchema,
} from 'src/schemas/saved-doctors.schema';
import { StatisticsService } from '../statistics/statistics.service';
import { StatisticsRepo } from '../statistics/statistics.repo';
import { StatisticView, StatisticViewSchema } from 'src/schemas/view.schema';
import { FirebaseService } from 'src/shared/firebase/firebase.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Specialization.name, schema: SpecializationSchema },
      { name: SavedDoctors.name, schema: SavedDoctorsSchema },
      { name: StatisticView.name, schema: StatisticViewSchema },
    ]),
  ],
  providers: [
    UserService,
    UserRepo,
    StatisticsService,
    StatisticsRepo,
    FirebaseService,
  ],
  controllers: [UserController],
})
export class UserModule {}
