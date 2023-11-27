import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { LanguageObject } from 'src/shared/dto/language-object.dto';
import { Specialization } from './specialization.schema';

export type SymptomDocument = HydratedDocument<Symptom>;

@Schema({
  timestamps: true,
})
export class Symptom {
  @Prop()
  name: LanguageObject;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: Specialization.name }])
  spec: Array<Specialization>;

  @Prop({ type: String })
  icon_url: string;
}

export const SymptomSchema = SchemaFactory.createForClass(Symptom);
