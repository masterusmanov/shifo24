import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import {
  Specialization,
  SpecializationSchema,
} from './schemas/specialization.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { State, StateSchema } from './schemas/states.schema';
import { Symptom, SymptomSchema } from './schemas/symptom.schema';
import { User, UserSchema } from '../auth/schemas/user.schema';
import { Icon, IconSchema } from './schemas/icon.schema';
import { Comment, CommentSchema } from '../comment/schema/comment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Specialization.name, schema: SpecializationSchema },
      { name: State.name, schema: StateSchema },
      { name: Symptom.name, schema: SymptomSchema },
      { name: User.name, schema: UserSchema },
      { name: Icon.name, schema: IconSchema },
      { name: Comment.name, schema: CommentSchema },
    ]),
  ],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule { }
