import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  Specialization,
  SpecializationDocument,
} from '../admin/schemas/specialization.schema';
import { User, UserDocument } from '../auth/schemas/user.schema';
import { GetSpecDoctorsDto, GetSymptomDoctorsDto } from './dto/spec.dto';
import { DoctorSearchDto } from '../user/dtos/user.dto';
import {
  SavedDoctors,
  SavedDoctorsDocument,
} from '../../schemas/saved-doctors.schema';
import { UserPayload } from 'src/dtos/userPayload.dto';
import { ObjectId } from 'mongodb';
import { Symptom, SymptomDocument } from '../admin/schemas/symptom.schema';
import { DoctorStatus } from 'src/enums/role.enum';
import { PaginationDto } from 'src/shared/dto/pagination.dto';

@Injectable()
export class SpecializationRepo {
  constructor(
    @InjectModel(Specialization.name)
    private readonly specModel: Model<SpecializationDocument>,
    @InjectModel(Symptom.name)
    private readonly symptomModel: Model<SymptomDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(SavedDoctors.name)
    private readonly savedDoctorsModel: Model<SavedDoctorsDocument>,
  ) {}

  async getPopularSpecs() {
    return this.specModel.find().limit(10);
  }

  async getSpecDoctors(params: GetSpecDoctorsDto, user: UserPayload) {
    const { limit = 10, page = 1 } = params;
    const mySavedDoctors = await this.savedDoctorsModel.find({
      user_id: user.id,
    });

    // const arrayOfDoctorsIds = mySavedDoctors.map((doctor) => doctor.doctor_id);
    let match;

    match = {
      doctor_status: DoctorStatus.Accepted,
      spec: new ObjectId(params.spec_id),
    }

    if (params.gender) {
      match.gender = params.gender
    }

    let query: any = this.userModel.aggregate([
      {
        $match: match
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
          middle_name: 1,
          second_name: 1,
          first_name: 1,
          location: 1,
          price: 1,
          image_id: 1,
          languages: 1,
          rate: 1,
          job_date: 1,
          comments_count: 1,
          spec: 1,
          saved: 1,
          workplace: 1,
          gender: 1,
        },
      },
      { $skip: (Number(page) - 1) * Number(limit) },
      { $limit: Number(limit) },
    ]);

    if (params.cheapest_sort === 'true') {
      return query.sort({ price: 'asc' });
    }

    if (params.rate_sort === 'true') {
      return query.sort({ rate: 'desc' });
    }

    if (params.nearest_sort) {
      const distance = 1;
      const unitValue = 10000;

      query = this.userModel.aggregate([
        {
          $geoNear: {
            near: {
              type: 'Point',
              coordinates: [Number(params.long), Number(params.latt)],
            },
            maxDistance: distance * unitValue,
            distanceField: 'distance',
            distanceMultiplier: 1 / unitValue,
            key: 'location',
          },
        },
        {
          $match: match,
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
            middle_name: 1,
            second_name: 1,
            first_name: 1,
            location: 1,
            price: 1,
            image_id: 1,
            languages: 1,
            rate: 1,
            job_date: 1,
            comments_count: 1,
            spec: 1,
            saved: 1,
            gender: 1,
          },
        },
        {
          $sort: {
            distance: 1,
          },
        },
        { $skip: (Number(page) - 1) * Number(limit) },
        { $limit: Number(limit) },
      ]);
    }

    return query;
  }

  async getAllDoctorsByRate(params: PaginationDto, user: UserPayload) {
    const { limit = 10, page = 1 } = params;
    const mySavedDoctors = await this.savedDoctorsModel.find({
      user_id: user.id,
    });

    let match = {};

    // const arrayOfDoctorsIds = mySavedDoctors.map((doctor) => doctor.doctor_id);

    match = {
      doctor_status: DoctorStatus.Accepted,
    }

    const query: any = this.userModel.aggregate([
      {
        $match: match
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
          workplace: 1,
          gender: 1,
        },
      },
      {
        $sort: {
          rate: -1
        },
      },
      { $skip: (Number(page) - 1) * Number(limit) },
      { $limit: Number(limit) },
    ]);

    return query;
  }

  async getSymptomDoctors(params: GetSymptomDoctorsDto, user: UserPayload) {
    const { limit = 10, page = 1 } = params;
    const mySavedDoctors = await this.savedDoctorsModel.find({
      user_id: user.id,
    });

    let query: any = this.userModel.aggregate([
      {
        $match: {
          spec: {
            $in: params.spec_ids.map((id) => new ObjectId(id)),
          },
          doctor_status: DoctorStatus.Accepted
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
          middle_name: 1,
          second_name: 1,
          first_name: 1,
          location: 1,
          price: 1,
          image_id: 1,
          languages: 1,
          rate: 1,
          job_date: 1,
          comments_count: 1,
          workplace: 1,
          spec: 1,
          saved: 1,
        },
      },
      { $skip: (Number(page) - 1) * Number(limit) },
      { $limit: Number(limit) },
    ]);

    if (params.cheapest_sort) {
      return query.sort({ price: 'asc' });
    }

    if (params.rate_sort) {
      return query.sort({ rate: 'asc' });
    }

    if (params.nearest_sort) {
      const distance = 1;
      const unitValue = 10000;

      query = this.userModel.aggregate([
        {
          $geoNear: {
            near: {
              type: 'Point',
              coordinates: [Number(params.long), Number(params.latt)],
            },
            maxDistance: distance * unitValue,
            distanceField: 'distance',
            distanceMultiplier: 1 / unitValue,
            key: 'location',
          },
        },
        {
          $match: {
            doctor_status: DoctorStatus.Accepted,
            spec: {
              $in: params.spec_ids.map((id) => new ObjectId(id)),
            },
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
            middle_name: 1,
            second_name: 1,
            first_name: 1,
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
        {
          $sort: {
            distance: 1,
          },
        },
        { $skip: (Number(page) - 1) * Number(limit) },
        { $limit: Number(limit) },
      ]);
    }

    return query;
  }

  async specSearch(params: DoctorSearchDto) {
    return this.specModel.find({
      doctor_status: DoctorStatus.Accepted,
      'name.uz': { $regex: params.search, $options: 'i' },
    });
  }

  async getAllSypmtoms() {
    return this.symptomModel.find().sort({ name: 'asc' });
  }

  async getAllSpecializations() {
    return this.specModel.find().sort({ name: 'asc' });
  }
}
