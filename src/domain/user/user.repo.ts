import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserPayload } from 'src/dtos/userPayload.dto';
import { HttpError } from 'src/enums/http-response.enum';
import { DoctorStatus, Role } from 'src/enums/role.enum';
import {
  SavedDoctors,
  SavedDoctorsDocument,
} from 'src/schemas/saved-doctors.schema';
import { User, UserDocument } from '../auth/schemas/user.schema';
import {
  DoctorProfileUpdate,
  DoctorSearchDto,
  GetNearDoctorsDto,
} from './dtos/user.dto';

@Injectable()
export class UserRepo {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(SavedDoctors.name)
    private readonly savedDoctorsModel: Model<SavedDoctorsDocument>,
  ) {}

  async getProfileInfo(id: string): Promise<User> {
    return this.userModel
      .findById(id)
      .populate([
        { path: 'spec', select: { symptoms: 0, createdAt: 0 } },
        { path: 'university.country' },
      ])
      .select({
        otp: 0,
        otp_date: 0,
        role: 0,
      })
      .lean();
  }

  async getUserOnly(id: string): Promise<User> {
    return this.userModel.findById(id).select({
      _id: 1,
      first_name: 1,
      second_name: 1,
      middle_name: 1,
      role: 1,
      phone: 1,
      comments_count: 1,
    });
  }

  async getUser(id: string): Promise<User> {
    return this.userModel.findById(id);
  }

  async profileUpdate(id: string, params: DoctorProfileUpdate): Promise<User> {
    let dataForUpdate;

    const user = await this.userModel.findById(id);

    if (!user) {
      throw new BadRequestException(HttpError.USER_NOT_FOUND);
    }

    if (user?.roles.includes(Role.Doctor)) {
      dataForUpdate = {
        contact_phone: params.contact_phone,
        about: params.about,
        birth_date: params.birth_date,
        certificate_url: params.certificate_url,
        first_name: params.first_name,
        second_name: params.second_name,
        middle_name: params.middle_name,
        full_name:
          params.first_name &&
          params.middle_name &&
          params.second_name &&
          `${params.first_name} ${params.middle_name} ${params.second_name}`,
        image_id: params.image_id,
        job_date: params.job_date,
        job_time: params.job_time && {
          from: params.job_time?.from,
          to: params.job_time?.to,
        },
        price: params.price,
        spec: params.spec,
        languages: params.languages,
        university: params.university,
        gender: params.gender,
        workplace: params.workplace,
        location: params.location
          ? {
              coordinates: [params?.location?.long, params?.location?.latt],
              name: params?.location?.name,
              type: 'Point',
            }
          : undefined,
      };
    } else {
      dataForUpdate = {
        about: params.about,
        birth_date: params.birth_date,
        first_name: params.first_name,
        image_id: params.image_id,
        gender: params.gender,
      };
    }

    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      dataForUpdate,
      {
        returnDocument: 'after',
      },
    );

    return updatedUser;
  }

  async rateAndCommentsCountUpdate(doctor_id, { rate, commentsCount }) {
    return this.userModel.findByIdAndUpdate(doctor_id, {
      rate,
      comments_count: commentsCount,
    });
  }

  async profileDelete(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id, {
      returnDocument: 'after',
    });
  }

  async doctorSearch(params: DoctorSearchDto, user: UserPayload) {
    const mySavedDoctors = await this.savedDoctorsModel.find({
      user_id: user.id,
    });

    const query: any = this.userModel.aggregate([
      {
        $match: {
          full_name: { $regex: params.search, $options: 'i' },
          doctor_status: DoctorStatus.Accepted,
        },
      },
      {
        $lookup: {
          from: 'specializations',
          localField: 'spec',
          foreignField: '_id',
          as: 'spec',
        },
      },
      {
        $addFields: {
          mySavedDoctors: {
            $concatArrays: [[], mySavedDoctors],
          },
        },
      },
      {
        $addFields: {
          saved: {
            $in: ['$_id', '$mySavedDoctors.doctor_id'],
          },
        },
      },
      {
        $project: {
          full_name: 1,
          location: 1,
          price: 1,
          image_id: 1,
          languages: 1,
          rate: 1,
          job_date: 1,
          comments_count: 1,
          spec: 1,
          saved: 1,
        },
      },
    ]);

    return query;
  }

  // async specSearch(params: DoctorSearchDto) {
  //   return this.userModel.aggregate([
  //     {
  //       $lookup: {
  //         from: 'specializations',
  //         localField: 'spec',
  //         foreignField: '_id',
  //         as: 'spec',
  //       },
  //     },
  //     {
  //       $match: {
  //         'spec.name.uz': { $regex: params.search, $options: 'i' },
  //       },
  //     },
  //   ]);
  // }

  async saveDoctor(user_id: string, doctor_id: string): Promise<SavedDoctors> {
    return this.savedDoctorsModel.create({
      user_id: user_id,
      doctor_id: doctor_id,
    });
  }

  async deleteSavedDcotor(
    user_id: string,
    doctor_id: string,
  ): Promise<SavedDoctors> {
    return this.savedDoctorsModel.findOneAndDelete({
      user_id: user_id,
      doctor_id: doctor_id,
    });
  }

  async getSavedDoctors(user_id: string) {
    return this.savedDoctorsModel.find({ user_id }).populate({
      path: 'doctor_id',
      select: {
        full_name: 1,
        first_name: 1,
        middle_name: 1,
        second_name: 1,
        location: 1,
        price: 1,
        image_id: 1,
        languages: 1,
        rate: 1,
        job_date: 1,
        spec: 1,
      },
      populate: {
        path: 'spec',
        select: {
          name: 1,
        },
      },
    });
  }

  async getNearDoctors(params: GetNearDoctorsDto) {
    const distance = 1;
    const unitValue = 10000;

    return this.userModel.aggregate([
      {
        $geoNear: {
          near: {
            type: 'Point',
            coordinates: [Number(params.long), Number(params.lat)],
          },
          maxDistance: distance * unitValue,
          distanceField: 'distance',
          distanceMultiplier: 1 / unitValue,
          key: 'location',
        },
      },
      {
        $sort: {
          distance: 1,
        },
      },
      { $limit: 5 },
    ]);
  }
}
