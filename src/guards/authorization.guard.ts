import { RoleGuard } from './role.guard';
import { Reflector } from '@nestjs/core';

export const AuthorizationGuard = new RoleGuard(new Reflector());
