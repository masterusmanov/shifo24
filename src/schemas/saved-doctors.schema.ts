import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/domain/auth/schemas/user.schema';

export type SavedDoctorsDocument = mongoose.HydratedDocument<SavedDoctors>;

@Schema({
  timestamps: true,
})
export class SavedDoctors {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  user_id: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  doctor_id: User;
}

export const SavedDoctorsSchema = SchemaFactory.createForClass(SavedDoctors);
