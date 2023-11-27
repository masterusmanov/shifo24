import { Body, Post, UseFilters, Controller, UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { ChatService } from './chat.service';
import { WebsocketsExceptionFilter } from 'src/exception/socket-exception.filter';
import { WsGuard } from 'src/guards/ws.guard';
import { UserPayload } from 'src/dtos/userPayload.dto';
import { GetMessagesDto, MessageDto } from './dtos/message.dto';

UseFilters(new WebsocketsExceptionFilter());
@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: '/chat',
})
export class ChatsGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  constructor(private readonly chatService: ChatService) {}

  @WebSocketServer()
  server: Server;

  private logger: Logger;

  @SubscribeMessage('leaveRoom')
  public leaveRoom(client: Socket, room: string): void {
    client.leave(room);
    client.emit('leftRoom', room);
  }

  @UseGuards(WsGuard)
  @SubscribeMessage('joinRoom')
  public async joinRoom(
    @ConnectedSocket() client: Socket & { user: UserPayload },
    @Body() chat: GetMessagesDto,
  ): Promise<void> {

    client.join(chat.room);
    const messages = await this.chatService.getMessages(chat);

    client.to(chat.room).emit('getMessages', messages); 
  }

  @UseGuards(WsGuard)
  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody() message: MessageDto,
    @ConnectedSocket() client: Socket & { user: UserPayload },
  ): Promise<void> {

    const dbMessage = await this.chatService.sendMessage(message, client.user);

    client.broadcast.to(dbMessage.room).emit('getMessages', dbMessage);
  }

  handleConnection(client: any, ...args: any[]) {
    console.log('Handle connection');
  }

  handleDisconnect(client: any) {
    console.log('Handle disconnect');
  }

  afterInit(server: any) {
    console.log('Initialized!');
  }
}
