import { Injectable } from '@nestjs/common';
import {
  BadRequestException,
  ConflictException,
} from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserPayload } from 'src/dtos/userPayload.dto';
import { HttpError } from 'src/enums/http-response.enum';
import { Role } from 'src/enums/role.enum';
import { UserRepo } from '../user/user.repo';
import { CommentDto, GetDoctorCommentsDto } from './dtos/comment.dto';
import { Comment, CommentDocument } from './schema/comment.schema';
import { ObjectId } from 'mongodb';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name)
    private readonly commentModel: Model<CommentDocument>,
    private readonly userRepo: UserRepo,
  ) {}

  async createComment(params: CommentDto, user?: UserPayload) {
    const hasComment = await this.getOneUserComment(user.id, params.doctor_id);

    if (hasComment.length) {
      throw new ConflictException(HttpError.YOU_HAVE_ALREADY_COMMENT);
    }

    const profile: any = await this.userRepo.getUser(params.doctor_id);

    if (profile?._id.toString() === user.id) {
      throw new BadRequestException(HttpError.YOU_CANNOT_COMMENT_OWN_PROFILE);
    }

    if (!profile?.roles.includes(Role.Doctor)) {
      throw new BadRequestException(HttpError.ONLY_COMMENT_TO_DOCTOR);
    }

    const newComment = await this.commentModel.create({
      text: params.text,
      doctor_id: params.doctor_id,
      rate: params.rate,
      created_by: user.id,
    });

    const averageRate = await this.commentModel.aggregate([
      {
        $match: {
          doctor_id: new ObjectId(params.doctor_id),
        },
      },
      {
        $group: {
          _id: '$doctor_id',
          avgRate: { $avg: '$rate' },
        },
      },
    ]);

    const commentsCount = profile.comments_count ? profile.comments_count : 0;

    await this.userRepo.rateAndCommentsCountUpdate(params.doctor_id, {
      rate: averageRate[0].avgRate,
      commentsCount: commentsCount + 1,
    });

    return newComment;
  }

  async getDoctorComments(params: GetDoctorCommentsDto) {
    const statistic = {
      one: 0,
      two: 0,
      three: 0,
      four: 0,
      five: 0,
      avg: 0,
    };

    const query = await this.commentModel
      .find({ doctor_id: params.doctor_id })
      .populate('created_by', { first_name: 1, image_id: 1 })
      .select({ rate: 1, text: 1, createdAt: 1 });

    for (let i = 0; i < query.length; i++) {
      switch (query[i].rate) {
        case 5:
          statistic.five += 1;
          break;
        case 4:
          statistic.four += 1;
          break;
        case 3:
          statistic.three += 1;
          break;
        case 2:
          statistic.two += 1;
          break;
        case 1:
          statistic.one += 1;
      }

      statistic.avg += query[i].rate;
    }

    statistic.avg = statistic.avg / query.length;

    return {
      statistic,
      data: query,
    };
  }

  async getMyComments(user: UserPayload) {
    return this.commentModel
      .find({ created_by: user.id })
      .populate('doctor_id', {
        image_id: 1,
        first_name: 1,
        second_name: 1,
        middle_name: 1,
      })
      .select({ rate: 1, text: 1, createdAt: 1 });
  }

  async getOneUserComment(user_id, doctor_id) {
    return this.commentModel.find({ created_by: user_id, doctor_id });
  }
}
