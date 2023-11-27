import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  HttpException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/enums/role.enum';
import { Observable } from 'rxjs';
import { verify } from 'jsonwebtoken';
import { HttpStatus } from 'src/enums/http-status.enum';
import { ROLES_KEY } from 'src/shared/decorators/roles.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()]
      );

      const request = context.switchToHttp().getRequest();

      const token = request.headers['authorization']?.substring(7);

      if (!token) throw new UnauthorizedException();

      const validUser: any = verify(token, process.env.JWT_KEY);

      if (!validUser) return false;

      request.user = validUser;

      return requiredRoles?.some((role) => validUser?.roles.includes(role));
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.Unauthorized);
    }
  }
}
