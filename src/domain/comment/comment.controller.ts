import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/decorator/user.decorator';
import { UserPayload } from 'src/dtos/userPayload.dto';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { CommentService } from './comment.service';
import { CommentDto, GetDoctorCommentsDto } from './dtos/comment.dto';
import {
  CreateCommentSwagger,
  GetCommentsSwagger,
} from './dtos/swagger/swagger';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(AuthenticationGuard)
  @CreateCommentSwagger()
  @Post()
  async createComment(
    @Body() params: CommentDto,
    @CurrentUser() user: UserPayload,
  ) {
    return this.commentService.createComment(params, user);
  }

  @UseGuards(AuthenticationGuard)
  @GetCommentsSwagger()
  @Get('profile-comments')
  async getProfileComments(@Query() params: GetDoctorCommentsDto) {
    return this.commentService.getDoctorComments(params);
  }

  @UseGuards(AuthenticationGuard)
  @GetCommentsSwagger()
  @Get('my-comments')
  async getMyComments(@CurrentUser() user: UserPayload) {
    return this.commentService.getMyComments(user);
  }
}
