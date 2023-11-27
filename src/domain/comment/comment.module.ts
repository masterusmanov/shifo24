import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { Comment, CommentSchema } from './schema/comment.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepo } from '../user/user.repo';
import { User, UserSchema } from '../auth/schemas/user.schema';
import {
  SavedDoctors,
  SavedDoctorsSchema,
} from 'src/schemas/saved-doctors.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: SavedDoctors.name, schema: SavedDoctorsSchema },
    ]),
  ],
  providers: [CommentService, UserRepo],
  controllers: [CommentController],
})
export class CommentModule {}
