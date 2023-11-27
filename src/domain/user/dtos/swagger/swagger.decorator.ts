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
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/domain/auth/schemas/user.schema';
import { HttpError, HttpResponse } from 'src/enums/http-response.enum';

// class CategorySwaggerDto extends CreateCategoryDto {
//   @ApiProperty({
//     example: '59dbbde5-6a1c-448c-94ac-1d11bac15a7b',
//   })
//   id: string;
// }

// class CategoryMultipleResponse {
//   @ApiProperty({
//     type: [CategorySwaggerDto],
//   })
//   data: Array<CategorySwaggerDto>;
// }

class SingleResponse {
  @ApiProperty({
    type: User,
  })
  data: User;
}

// export function CreateSwagger() {
//   return applyDecorators(
//     ApiBearerAuth(),
//     ApiCreatedResponse({ type: CategorySwaggerDto }),
//     ApiUnauthorizedResponse({ description: ErrorCode.Unauthorized }),
//     ApiForbiddenResponse({ description: ErrorCode.Forbidden }),
//     ApiOperation({
//       summary: 'Create category',
//       description: 'Role required: MODERATOR, ADMIN',
//     })
//   );
// }

export function UpdateSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiCreatedResponse({ type: User }),
    ApiUnauthorizedResponse({ description: HttpError.UNAUTHORIZED }),
    ApiForbiddenResponse({ description: HttpError.FORBIDDEN }),
    ApiNotFoundResponse({ description: HttpError.USER_NOT_FOUND }),
    ApiOperation({
      summary: 'Update profile',
      // description: 'Role required: MODERATOR, ADMIN',
    }),
  );
}

export function DeleteSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOkResponse({ description: HttpResponse.OPERATION_DONE }),
    ApiUnauthorizedResponse({ description: HttpError.UNAUTHORIZED }),
    ApiForbiddenResponse({ description: HttpError.FORBIDDEN }),
    ApiNotFoundResponse({ description: HttpError.USER_NOT_FOUND }),
    ApiOperation({
      summary: 'Delete profile',
      // description: 'Role required: MODERATOR, ADMIN',
    }),
  );
}

// export function GetManySwagger() {
//   return applyDecorators(
//     ApiOkResponse({ type: CategoryMultipleResponse }),
//     ApiOperation({
//       summary: 'Get all categories',
//       description: 'Role required: NONE',
//     })
//   );
// }

export function GetOneSwagger() {
  return applyDecorators(
    ApiOkResponse({ type: SingleResponse }),
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Get single profile',
      description: 'Role required: NONE',
    }),
  );
}

export function GetOwnSwagger() {
  return applyDecorators(
    ApiOkResponse({ type: SingleResponse }),
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Get own profile',
      description: 'Role required: NONE',
    }),
  );
}

export function GetSavedDoctorsSwagger() {
  return applyDecorators(
    ApiOkResponse({ type: SingleResponse }),
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Get saved doctors',
      description: 'Role required: Client',
    }),
  );
}

export function DeleteSavedDoctorSwagger() {
  return applyDecorators(
    ApiOkResponse({ type: SingleResponse }),
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Delete saved doctor',
      description: 'Role required: Client',
    }),
  );
}

export function GetSearchSpecSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Search specialization',
      description: 'Role required: User',
    }),
  );
}

export function GetSearchDoctorSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Search doctor',
      description: 'Role required: User',
    }),
  );
}

export function getNearDoctorsSwagger() {
  return applyDecorators(
    ApiOkResponse({ type: SingleResponse }),
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Get nearest doctors',
      description: 'Role required: Client',
    }),
  );
}

// export function DeleteSwagger() {
//   return applyDecorators(
//     ApiBearerAuth(),
//     ApiOkResponse({ type: CategorySwaggerDto }),
//     ApiNotFoundResponse({ description: ErrorCode.CategoryNotFound }),
//     ApiOperation({
//       summary: 'Delete category',
//       description: 'Role required: MODERATOR, ADMIN',
//     })
//   );
// }
