import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiUnauthorizedResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { User } from 'src/domain/auth/schemas/user.schema';
import { HttpError } from 'src/enums/http-response.enum';

export function UpdateSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiCreatedResponse({ type: User }),
    ApiUnauthorizedResponse({ description: HttpError.UNAUTHORIZED }),
    ApiForbiddenResponse({ description: HttpError.FORBIDDEN }),
    ApiNotFoundResponse({ description: HttpError.USER_NOT_FOUND }),
    ApiOperation({
      summary: 'Update doctor profile',
      // description: 'Role required: MODERATOR, ADMIN',
    })
  );
}

export function CreateDoctorSwagger() {
  return applyDecorators(
    ApiOkResponse({ type: User }),
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Fill doctor profile up',
      description: 'Role required: NONE',
    })
  );
}

export function CreateClientSwagger() {
  return applyDecorators(
    ApiOkResponse({ type: User }),
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Fill client profile up',
      description: 'Role required: NONE',
    })
  );
}