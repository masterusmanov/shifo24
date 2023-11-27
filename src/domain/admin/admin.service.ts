import { ConflictException, HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpError } from 'src/enums/http-response.enum';
import { HttpStatus } from 'src/enums/http-status.enum';
import { DoctorStatus, Role } from 'src/enums/role.enum';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { AdminRegisterPhoneDto } from '../auth/dtos/register.dto';
import { User, UserDocument } from '../auth/schemas/user.schema';
import { Comment, CommentDocument } from '../comment/schema/comment.schema';
import {
  ApplicationAcceptOrRejectDto,
  DeleteOrUpdateOneElement,
  SearchListDto,
} from './dtos/admin.dto';
import { DeleteIconDto, IconDto } from './dtos/icon.dto';
import { SpecializationDto, UpdateSpecDto } from './dtos/specialization.dto';
import { UpdateStateDto } from './dtos/state.dto';
import { SymptomDto, UpdateSymptomDto } from './dtos/symptom.dto';
import { Icon, IconDocument } from './schemas/icon.schema';
import {
  Specialization,
  SpecializationDocument,
} from './schemas/specialization.schema';
import { State, StateDocument, StateType } from './schemas/states.schema';
import { Symptom, SymptomDocument } from './schemas/symptom.schema';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Specialization.name)
    private readonly specModel: Model<SpecializationDocument>,
    @InjectModel(State.name)
    private readonly stateModel: Model<StateDocument>,
    @InjectModel(Symptom.name)
    private readonly symptomModel: Model<SymptomDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(Icon.name)
    private readonly iconModel: Model<IconDocument>,
    @InjectModel(Comment.name)
    private readonly commentModel: Model<CommentDocument>,
  ) {}

  async addAdmin(params: AdminRegisterPhoneDto) {
    const user = await this.userModel.findOne({ phone: params.phone });

    if (user?.registered) {
      throw new ConflictException(HttpError.ADMIN_ALREADY_REGISTERED);
    }

    const admin = await this.userModel.create({
      phone: params.phone,
      first_name: params.first_name,
      registered: true,
      roles: [Role.Admin],
      accepted_status: true,
      otp_date: Date.now(),
    });

    return { admin, success: 'ok' };
  }

  async createSpecialization(params: SpecializationDto) {
    try {
      const spec = await this.specModel.create(params);
      return spec;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.ServerError);
    }
  }

  async updateSpec(params: DeleteOrUpdateOneElement, data: UpdateSpecDto) {
    try {
      const spec = await this.specModel.findByIdAndUpdate(params.id, data, {
        new: true,
      });
      return spec;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.ServerError);
    }
  }

  async getAllSpecializations(params: PaginationDto) {
    const { limit = 10, page = 1 } = params;

    const totalCountOfSpecs = await this.specModel.count();

    const query = await this.specModel
      .find()
      .sort({ name: 'asc' })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    return {
      page: Number(page),
      data: query,
      total_count: totalCountOfSpecs,
    };
  }

  async deleteSpec(params: DeleteOrUpdateOneElement) {
    return this.specModel.findByIdAndDelete(params.id);
  }

  async getOneSpecizalization(id: string) {
    return this.specModel.findById(id);
  }

  async createSymptom(params: SymptomDto) {
    try {
      const symptom = await this.symptomModel.create(params);
      return symptom;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.ServerError);
    }
  }

  async updateSymptom(
    params: DeleteOrUpdateOneElement,
    data: UpdateSymptomDto,
  ) {
    try {
      const symptom = await this.symptomModel.findByIdAndUpdate(
        params.id,
        data,
        { new: true },
      );
      return symptom;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.ServerError);
    }
  }

  async getAllSypmtoms(params: SearchListDto) {
    const { limit = 20, page = 1, search = '' } = params;

    const totalCountOfSymptoms = await this.symptomModel.count();

    const query = await this.symptomModel
      .find({
        'name.eng': { $regex: search, $options: 'i' },
      })
      .populate('spec')
      .sort({ name: 'asc' })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    return {
      page: Number(page),
      data: query,
      total_count: totalCountOfSymptoms,
    };
  }

  async getOneSymptom(id: string) {
    return this.symptomModel.findById(id).populate('spec');
  }

  async deleteSymptom(params: DeleteOrUpdateOneElement) {
    return this.symptomModel.findByIdAndDelete(params.id);
  }

  async createCountry(data: State) {
    try {
      const country = await this.stateModel.create(data);
      return country;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.ServerError);
    }
  }

  async updateCountry(params: DeleteOrUpdateOneElement, data: UpdateStateDto) {
    try {
      const state = await this.stateModel.findByIdAndUpdate(params.id, data, {
        new: true,
      });
      return state;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.ServerError);
    }
  }

  async getAllCountries(params: PaginationDto) {
    const { limit = 20, page = 1 } = params;

    const countOfNormalStates = await this.stateModel.count({
      type: StateType.Normal,
    });

    const popularStates = await this.stateModel
      .find({
        type: StateType.Popular,
      })
      .sort({ 'name.eng': 1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    const normalStates = await this.stateModel
      .find({
        type: StateType.Normal,
      })
      .sort({ 'name.eng': 1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    return {
      page: Number(page),
      popular_states: popularStates,
      normal_states: normalStates,
      total_count: countOfNormalStates,
    };
  }

  async applicationStatus(
    params: DeleteOrUpdateOneElement,
    data: ApplicationAcceptOrRejectDto,
  ) {
    return this.userModel.findByIdAndUpdate(
      params.id,
      {
        doctor_status: data.doctor_status,
      },
      { new: true },
    );
  }

  async getPendingDoctorsList(params: SearchListDto) {
    const { limit = 10, page = 1, search = '' } = params;

    const totalCountOfPendingDoctors = await this.userModel.count({
      doctor_status: DoctorStatus.Pending,
      roles: { $in: [Role.Doctor] },
    });
    const query = await this.userModel
      .find({
        doctor_status: DoctorStatus.Pending,
        roles: { $in: [Role.Doctor] },
        // full_name: { $regex: search, $options: 'i' },
      })
      .populate([{ path: 'spec' }, { path: 'university.country' }])
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    return {
      page: Number(page),
      data: query,
      total_count: totalCountOfPendingDoctors,
    };
  }

  async addIcon(params: IconDto) {
    return this.iconModel.create(params);
  }

  async getIcons(params: PaginationDto) {
    const { limit = 10, page = 1 } = params;

    const totalCountOfIcons = await this.iconModel.count();

    const query = await this.iconModel
      .find()
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    return {
      page: Number(page),
      data: query,
      total_count: totalCountOfIcons,
    };
  }

  async deleteIcon(params: DeleteIconDto) {
    return this.iconModel.findByIdAndDelete(params.id);
  }

  async getCommentsList(params: PaginationDto) {
    const { limit = 10, page = 1 } = params;

    const totalCountOfComments = await this.commentModel.count();

    const query = await this.commentModel
      .find()
      .populate([{ path: 'created_by' }, { path: 'doctor_id' }])
      .sort({ createdAt: 1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    return {
      page: Number(page),
      data: query,
      total_count: totalCountOfComments,
    };
  }

  async deleteComment(params: DeleteOrUpdateOneElement) {
    return this.commentModel.findByIdAndDelete(params.id);
  }

  async getDoctorsList(params: SearchListDto) {
    const { limit = 10, page = 1, search = '' } = params;

    const totalCountOfDoctors = await this.userModel.count({
      doctor_status: DoctorStatus.Accepted,
    });

    const query = await this.userModel
      .find({
        doctor_status: DoctorStatus.Accepted,
        full_name: { $regex: search, $options: 'i' },
      })
      .populate([{ path: 'spec' }, { path: 'university.country' }])
      .sort({ createdAt: 1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    return {
      page: Number(page),
      data: query,
      total_count: totalCountOfDoctors,
    };
  }

  async getClientsList(params: SearchListDto) {
    const { limit = 10, page = 1, search = '' } = params;

    const totalCountOfClients = await this.userModel.count({
      roles: { $in: [Role.Client] },
    });

    let match;

    match = {
      roles: { $in: [Role.Client] },
    }

    if (search) {
      match.full_name = { $regex: search, $options: 'i' }
    }

    const query = await this.userModel
      .find(match)
      .sort({ createdAt: 1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    return {
      page: Number(page),
      data: query,
      total_count: totalCountOfClients,
    };
  }

  async getUserById(id: string) {
    return this.userModel
      .findById(id)
      .populate([{ path: 'spec' }, { path: 'university.country' }]);
  }
}
