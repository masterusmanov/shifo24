import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Role } from 'src/enums/role.enum';

export type AdminDocument = mongoose.HydratedDocument<Admin>;

@Schema({
  timestamps: true,
})
export class Admin {
  @Prop({ type: String })
  login: string;

  @Prop({ type: String})
  password: string;

  @Prop({ type: String })
  username: string;

  @Prop({ type: Role })
  role: Role;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
