import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/domain/auth/schemas/user.schema';

export type CommentDocument = mongoose.HydratedDocument<Comment>;

@Schema({
  timestamps: true,
})
export class Comment {
  @Prop({ type: String })
  text: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  doctor_id: User;

  @Prop({ type: Number, min: 1, max: 5 })
  rate: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  created_by: User;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
