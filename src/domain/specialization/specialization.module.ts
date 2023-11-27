import { Module } from '@nestjs/common';
import { SpecializationService } from './specialization.service';
import { SpecializationController } from './specialization.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SpecializationRepo } from './specialization.repo';
import {
  Specialization,
  SpecializationSchema,
} from '../admin/schemas/specialization.schema';
import { User, UserSchema } from '../auth/schemas/user.schema';
import {
  SavedDoctors,
  SavedDoctorsSchema,
} from 'src/schemas/saved-doctors.schema';
import { Symptom, SymptomSchema } from '../admin/schemas/symptom.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Specialization.name, schema: SpecializationSchema },
      { name: User.name, schema: UserSchema },
      { name: SavedDoctors.name, schema: SavedDoctorsSchema },
      { name: Symptom.name, schema: SymptomSchema },
    ]),
  ],
  providers: [SpecializationService, SpecializationRepo],
  controllers: [SpecializationController],
})
export class SpecializationModule {}
