import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { verify } from 'jsonwebtoken';
import { HttpStatus } from 'src/enums/http-status.enum';

@Injectable()
class Authentication implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const request = context.switchToHttp().getRequest();

      const token = request.headers.authorization?.split(' ')[1];

      if (!token) throw new UnauthorizedException();

      const validUser: any = verify(token, process.env.JWT_KEY);

      request.user = validUser;

      return !!validUser;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.Unauthorized);
    }
  }
}

export const AuthenticationGuard = new Authentication();
