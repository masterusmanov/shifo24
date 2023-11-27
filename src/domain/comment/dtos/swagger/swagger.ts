import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Comment } from '../../schema/comment.schema';

export function CreateCommentSwagger() {
  return applyDecorators(
    ApiOkResponse({ type: Comment }),
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Create comment for doctor profile',
      description: 'Role required: User',
    }),
  );
}


export function GetCommentsSwagger() {
  return applyDecorators(
    ApiOkResponse({ type: [Comment] }),
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Get profile comments',
      description: 'Role required: User',
    }),
  );
}
