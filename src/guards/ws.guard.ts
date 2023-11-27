import { Injectable, CanActivate, UnauthorizedException } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { Observable } from 'rxjs';

@Injectable()
export class WsGuard implements CanActivate {
  canActivate(
    context: any,
  ): boolean | any | Promise<boolean | any> | Observable<boolean | any> {
    const bearerToken =
      context.args[0].handshake.headers.authorization?.split(' ')[1];

    if (!bearerToken) throw new UnauthorizedException();

    try {
      const validUser = verify(bearerToken, process.env.JWT_KEY) as any;

      context.args[0].user = validUser;
      return true;
    } catch (ex) {
      console.log(ex);
      return false;
    }
  }
}
