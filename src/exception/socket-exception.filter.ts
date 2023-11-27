import { ArgumentsHost, Catch, HttpException, WsExceptionFilter } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'dgram';

type WsExceptionType = 'BadRequest' | 'Unauthorized' | 'Unknown';

export class WsTypeException extends WsException {
  readonly type: WsExceptionType;
  
  constructor(type: WsExceptionType, message: string | unknown) {
    const error = {
      type,
      message
    };

    super(error)
    this.type = type;
  }
}

@Catch()
export class WebsocketsExceptionFilter implements WsExceptionFilter {
  catch(exception: WsException, host: ArgumentsHost) {
    const socket = host.switchToWs().getClient();
    this.handleError(socket, exception);
  }

  public handleError(client: Socket, exception: HttpException | WsException) {
    if (exception instanceof HttpException) {
      // handle http exception
    } else {
      // handle websocket exception
      client.emit('exception', {
        status: 'error',
        message: 'Message is invalid',
      });
    }
  }
}