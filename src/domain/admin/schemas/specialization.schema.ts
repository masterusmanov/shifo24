import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Type } from 'class-transformer';
import { LanguageObject } from 'src/shared/dto/language-object.dto';

export type SpecializationDocument = mongoose.HydratedDocument<Specialization>;

@Schema({
  timestamps: true,
})
export class Specialization {
  @Type(() => LanguageObject)
  @Prop()
  name: LanguageObject;

  @Prop({ type: String })
  icon_url: string;
}

export const SpecializationSchema =
  SchemaFactory.createForClass(Specialization);
