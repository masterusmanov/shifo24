import { Body, Controller } from '@nestjs/common';
import { Post } from '@nestjs/common/decorators';
import { ApiTags } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { GetMessagesDto } from './dtos/message.dto';
import { Message } from './schemas/chat.schema';

@ApiTags('chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async getMessages(@Body() params: GetMessagesDto): Promise<Message[]> {

    return this.chatService.getMessages(params);
  }
}
