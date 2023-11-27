import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserPayload } from 'src/dtos/userPayload.dto';
import { GetMessagesDto, MessageDto } from './dtos/message.dto';
import {
  Message,
  MessageDocument,
  Room,
  RoomDocument,
} from './schemas/chat.schema';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Message.name)
    private readonly messageModel: Model<MessageDocument>,
    @InjectModel(Room.name)
    private readonly roomModel: Model<RoomDocument>,
  ) {}

  async getChats(): Promise<Room[]> {
    return await this.roomModel.find();
  }

  async createRoom(room: Room): Promise<void> {
    const createdRoom = await this.roomModel.create(room);
    await createdRoom.save();
  }

  async sendMessage(
    message: MessageDto,
    sender: UserPayload,
  ): Promise<Message> {
    const sendedMessage = await this.messageModel.create({
      sender: sender.id,
      message: message.message,
      room: message.room,
    });

    // await sendedMessage.save();
    return sendedMessage;
  }

  async getMessages(params: GetMessagesDto): Promise<Message[]> {
    const { room, limit = 50 } = params;

    return this.messageModel.find({ room }).limit(Number(limit));
  }
}
