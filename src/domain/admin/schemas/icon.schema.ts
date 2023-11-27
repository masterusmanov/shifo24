import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type IconDocument = mongoose.HydratedDocument<Icon>;

@Schema({
  timestamps: true,
})
export class Icon {
  @Prop({ type: String })
  icon_m_url: string;

  @Prop({ type: String })
  icon_s_url: string;
}

export const IconSchema = SchemaFactory.createForClass(Icon);
