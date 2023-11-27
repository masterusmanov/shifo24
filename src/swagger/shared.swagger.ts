import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

export function AuthSwagger() {
  return applyDecorators(ApiBearerAuth());
}

export function AdminAuthSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      description: 'Role required: Admin',
    }),
  );
}

export function SuperAdminAuthSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      description: 'Role required: Superadmin',
    }),
  );
}
