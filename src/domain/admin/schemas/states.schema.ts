import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { LanguageObject } from 'src/shared/dto/language-object.dto';

export type StateDocument = HydratedDocument<State>;

export enum StateType {
  Popular = 'popular',
  Normal = 'normal',
}

@Schema({
  timestamps: true,
})
export class State {
  @ApiProperty({ type: LanguageObject })
  @Type(() => LanguageObject)
  @Prop()
  name: LanguageObject;

  @ApiProperty({ enum: StateType })
  @IsString()
  @Prop({ type: String, enum: [StateType.Normal, StateType.Popular] })
  @IsEnum(StateType)
  type: StateType;

  @ApiProperty()
  @IsString()
  @Prop({ type: String, unique: true })
  code: string;
}

export const StateSchema = SchemaFactory.createForClass(State);
