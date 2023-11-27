import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { IsArray, IsMongoId, IsOptional, IsString } from 'class-validator';
import { User } from 'src/domain/auth/schemas/user.schema';

export type RoomDocument = HydratedDocument<Room>;

@Schema({
  timestamps: true,
})
export class Room {
  @IsArray()
  @IsMongoId({ each: true })
  @Prop({
    type: mongoose.Types.ObjectId,
    ref: 'User',
  })
  participants: [User];

  @IsOptional()
  @IsString()
  @Prop({
    type: Array<Message>,
  })
  messages?: [Message];
}

export type MessageDocument = HydratedDocument<Message>;

@Schema({
  timestamps: true,
})
export class Message {
  @Prop({
    type: String,
    required: true,
  })
  sender: string;

  @Prop({
    type: mongoose.Types.ObjectId,
    ref: 'Room',
    required: true,
  })
  room: string;

  @Prop({
    type: String,
    required: true,
  })
  message: string;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
export const MessageSchema = SchemaFactory.createForClass(Message);
